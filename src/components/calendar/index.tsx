import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  setHours,
  setMinutes,
  startOfMonth,
  startOfWeek,
  subMonths
} from "date-fns";
import { it } from "date-fns/locale"; // 🇮🇹 Importa la lingua italiana

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { operators } from "@/mocks/operators.mock";
import { treatments } from "@/mocks/treatments.mock";
import { AppointmentType } from "@/types/appointment.type";
import { OperatorType } from "@/types/operator.type";
import { TreatmentType } from "@/types/treatment.type";
import { ModeType } from "@/types/util.type";
import { capitalizeFirstLetter } from "@/utils/common.utils";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Calendar as CalendarIcon,
  Eye,
  PlusIcon,
  Undo2,
  X
} from "lucide-react";
import { JSX, useEffect, useState } from "react";
import DrawerInput from "../custom/drawer-input";

interface Appointment {
  id: string;
  date: string; // "yyyy-MM-dd"
  title: string;
  time: string;
  duration: string;
  treatmentId: string;
  operatorId: string;
  notes?: string;
}

interface showAppointmentType {
  appointment: AppointmentType;
  treatment: TreatmentType;
  operator: OperatorType;
}

export default function CalendarScreen() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] =
    useState<Appointment | null>(null);
  const [hours, setHoursValue] = useState<number>(new Date().getHours());
  const [minutes, setMinutesValue] = useState<number>(new Date().getMinutes());
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [duration, setDuration] = useState<string | null>(null);
  const [showAppointment, setShowAppointment] =
    useState<showAppointmentType | null>(null);
  const [mode, setMode] = useState<ModeType>("add");

  const today = new Date();

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) setAppointments(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (appointments.length === 0) return;
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const handleDateChange = (selected: Date | undefined) => {
    if (!selected) return;
    const updated = setMinutes(setHours(selected, hours), minutes);
    setCurrentAppointment((prev) => ({
      ...prev!,
      date: format(updated, "yyyy-MM-dd")
    }));
    setOpen(false);
  };

  // Generate time options: 00:00 → 23:55, step 5 min
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 5) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      times.push(`${hh}:${mm}`);
    }
  }

  const durations = ["15", "30", "45", "60", "90"];

  // Open dialog for a specific date (new) or appointment (edit)
  const openDialog = (date?: Date, appt?: Appointment) => {
    if (appt) {
      // editing existing appt -> use appt data
      setMode("edit");
      setCurrentAppointment(appt);
    } else {
      setMode("add");
      const today = date ?? new Date();
      // new appt -> create with provided date
      setCurrentAppointment({
        id: Date.now().toString(),
        date: format(today, "yyyy-MM-dd"),
        title: "",
        time: "",
        duration: "",
        treatmentId: "",
        operatorId: ""
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentAppointment) return;
    setAppointments((prev) =>
      prev.some((a) => a.id === currentAppointment.id)
        ? prev.map((a) =>
            a.id === currentAppointment.id ? currentAppointment : a
          )
        : [...prev, currentAppointment]
    );
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleView = (id: string) => {
    setOpenDrawer(!openDrawer);
    const appointment = appointments.find((a) => a.id === id);
    const treatment = treatments.find((t) => t.id === appointment?.treatmentId);
    const operator = operators.find((o) => o.id === appointment?.operatorId);
    const showApp: showAppointmentType = {
      appointment: {
        id: appointment?.id ?? "",
        date: appointment?.date ?? "",
        title: appointment?.title ?? "",
        time: appointment?.time ?? "",
        duration: appointment?.duration ?? "",
        price: 0,
        notes: appointment?.notes ?? ""
      },
      treatment: treatment as TreatmentType,
      operator: operator as OperatorType
    };
    setShowAppointment(showApp);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const currentMonthView = () => setCurrentMonth(new Date()); // ← bouton Current Month

  // corrected renderCells — capture a fresh `cellDate` for each cell
  const renderCells = () => {
    const rows: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      const cells: JSX.Element[] = [];

      for (let i = 0; i < 7; i++) {
        // capture the date for this cell (immutable)
        const cellDate = day;
        const dayKey = format(cellDate, "yyyy-MM-dd");

        // appointments for this specific cell date
        const dayAppointments = appointments.filter((a) => a.date === dayKey);

        cells.push(
          <div
            key={dayKey}
            onClick={() => openDialog(cellDate)} // uses captured cellDate
            className={`border rounded-lg p-2 h-32 cursor-pointer flex flex-col justify-between ${
              !isSameMonth(cellDate, monthStart)
                ? "bg-gray-50 text-gray-400"
                : ""
            } ${isSameDay(cellDate, new Date()) ? "ring-2 ring-blue-400" : ""}`}
          >
            <div className="text-sm font-medium">{format(cellDate, "d")}</div>

            <div className="flex flex-col gap-1 overflow-y-auto">
              {dayAppointments.map((a) => (
                <div
                  key={a.id}
                  className="bg-blue-100 dark:bg-gray-800 rounded px-1 text-xs flex justify-between items-center"
                  onClick={(e) => {
                    // stop bubbling so the cell's onClick doesn't run
                    e.stopPropagation();
                    // when editing, use the appointment object; also parse its stored date if needed
                    openDialog(parseISO(a.date), a);
                  }}
                >
                  <span className="truncate">
                    {a.time} {a.title}
                  </span>
                  <div className="flex items-center">
                    <Button
                      variant="link"
                      className="text-green-500 ml-2 p-0 h-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(a.id);
                      }}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="link"
                      className="text-red-500 ml-2 p-0 h-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(a.id);
                      }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

        // increment to next day for next cell
        day = addDays(day, 1);
      }

      // push the week row
      rows.push(
        <div
          key={format(addDays(day, -1), "yyyy-MM-dd")}
          className="grid grid-cols-7 gap-1"
        >
          {cells}
        </div>
      );
    }

    return <div className="space-y-1 m-4">{rows}</div>;
  };

  const handleDisabled = () => {
    return (
      !currentAppointment?.title ||
      !currentAppointment.date ||
      !currentAppointment.time ||
      !currentAppointment.duration ||
      !currentAppointment.treatmentId ||
      !currentAppointment.operatorId
    );
  };
  const handleToday = () => {
    setCurrentAppointment((prev) => ({
      ...prev!,
      date: format(today, "yyyy-MM-dd")
    }));
    setOpen(true); // keep popover open
    setCurrentMonth(startOfMonth(today));
  };

  const handleTimeSelect = (selectedTime: string) => {
    setCurrentAppointment((prev) => ({
      ...prev!,
      time: selectedTime
    }));
  };

  const handleDurationSelect = (selectedDuration: string) => {
    setDuration(selectedDuration);
    setCurrentAppointment((prev) => ({
      ...prev!,
      duration: selectedDuration
    }));
  };

  return (
    <div className="h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="flex gap-2">
          <Button variant="outline" className="w-35" onClick={prevMonth}>
            <ArrowLeft /> Precedente
          </Button>
          <Button variant="outline" className="w-40" onClick={currentMonthView}>
            <CalendarDays />
            Mese corrente
          </Button>{" "}
          {/* ← bouton */}
          <Button variant="outline" className="w-35" onClick={nextMonth}>
            Prossimo <ArrowRight />
          </Button>
        </div>
        <h1 className="text-2xl font-semibold text-center flex-1">
          {capitalizeFirstLetter(
            format(currentMonth, "MMMM yyyy", { locale: it })
          )}
        </h1>
        <Button variant="default" className="w-40" onClick={() => openDialog()}>
          <PlusIcon /> Prenotazione
        </Button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2 mt-3 text-center font-medium text-gray-600">
        {["Lun", "Mar", "Mer", "Gio", "ven", "Sab", "Dom"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grow overflow-y-auto">{renderCells()}</div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent style={{ padding: "12px" }}>
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "Modifica Appuntamento" : "Nuovo Appuntamento"}
            </DialogTitle>
          </DialogHeader>

          {currentAppointment && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titolo</Label>
                <Input
                  placeholder="Titolo dell'appuntamento"
                  value={currentAppointment.title}
                  onChange={(e) =>
                    setCurrentAppointment({
                      ...currentAppointment,
                      title: e.target.value
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !currentAppointment.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentAppointment.date ? (
                          format(currentAppointment.date, "dd/MM/yyyy", {
                            locale: it
                          })
                        ) : (
                          <span>Seleziona una data</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className=" p-0" align="start">
                      {/* Calendar */}
                      <Calendar
                        className="w-full"
                        mode="single"
                        selected={new Date(currentAppointment.date)}
                        onSelect={handleDateChange}
                        initialFocus
                        locale={it} // 🇮🇹 Set locale to Italian
                        defaultMonth={
                          new Date(currentAppointment.date) ?? new Date()
                        } // updates when setDate(today)
                        month={currentMonth} // link the month state
                        onMonthChange={setCurrentMonth}
                        captionLayout="dropdown"
                        fromYear={today.getFullYear()}
                        toYear={today.getFullYear() + 10}
                        disabled={{
                          before: startOfMonth(new Date()) // ⛔ disable all days before current month
                        }}
                      />

                      {/* “Go to Today” button */}
                      <div className="flex justify-end p-2 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleToday}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          Oggi
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="time">Fascia oraria</Label>
                  <Select
                    value={currentAppointment.time}
                    onValueChange={(val) =>
                      setCurrentAppointment({
                        ...currentAppointment,
                        time: val
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleziona un orario" />
                    </SelectTrigger>
                    <SelectContent>
                      {times.map((t) => (
                        <SelectItem
                          key={t}
                          value={t}
                          className={cn(
                            "text-left px-4 py-2 hover:bg-gray-100 focus:outline-none",
                            t === currentAppointment.time &&
                              "bg-blue-100 font-semibold"
                          )}
                          onClick={() => handleTimeSelect(t)}
                        >
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Durata</Label>
                  <Select
                    value={currentAppointment.duration}
                    onValueChange={(val) =>
                      setCurrentAppointment({
                        ...currentAppointment,
                        duration: val
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleziona una durata" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((d) => (
                        <SelectItem
                          key={d}
                          value={d}
                          className={cn(
                            "text-left px-4 py-2 hover:bg-gray-100 focus:outline-none",
                            d === duration && "bg-blue-100 font-semibold"
                          )}
                          onClick={() => handleDurationSelect(d)}
                        >
                          {d} {"min"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="treatment">Trattamento</Label>
                <Select
                  value={currentAppointment.treatmentId}
                  onValueChange={(val) =>
                    setCurrentAppointment({
                      ...currentAppointment,
                      treatmentId: val
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleziona un trattamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {treatments
                      .filter((t) => t.status === "Active")
                      .map((treatment: TreatmentType) => (
                        <SelectItem key={treatment.id} value={treatment.id}>
                          {treatment.id} - {treatment.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="operator">Operatore</Label>
                <Select
                  value={currentAppointment.operatorId}
                  onValueChange={(val) =>
                    setCurrentAppointment({
                      ...currentAppointment,
                      operatorId: val
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleziona un operatore" />
                  </SelectTrigger>
                  <SelectContent>
                    {operators
                      .filter((o) => o.status === "Active")
                      .map((operator: OperatorType) => (
                        <SelectItem key={operator.id} value={operator.id}>
                          {operator.id} - {operator.firstName}{" "}
                          {operator.lastName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Commenti</Label>
                <Textarea
                  id="message"
                  placeholder="Inserisci qui i tuoi appunti..."
                  className="min-h-[100px]"
                  value={currentAppointment.notes}
                  onChange={(e) =>
                    setCurrentAppointment({
                      ...currentAppointment,
                      notes: e.target.value
                    })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              className="w-[100px] mr-3"
              onClick={() => setIsDialogOpen(false)}
            >
               <Undo2 /> Cancella
            </Button>
            <Button
              disabled={handleDisabled()}
              onClick={handleSave}
              className="w-[100px]"
            >
              <CalendarDays /> Prenota
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Drawer per visualizzare il dettaglio dell'appuntamento */}
      <DrawerInput
        open={openDrawer}
        setOpen={setOpenDrawer}
        position="right"
        title="Dettaglio Appuntamento"
      >
        <div className="m-4 flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Titolo
            </p>
            <p className="text-lg font-medium">
              {showAppointment?.appointment.title}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Data
            </p>
            <p className="text-lg font-medium">
              {showAppointment?.appointment.date}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Fascia oraria
            </p>
            <p className="text-lg font-medium">
              {showAppointment?.appointment.time}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Durata
            </p>
            <p className="text-lg font-medium">
              {showAppointment?.appointment.duration} min
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Trattamento
            </p>
            <p className="text-lg font-medium">
              {showAppointment?.treatment.id} -{" "}
              {showAppointment?.treatment.name}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Operatore
            </p>
            <p className="text-lg font-medium">
              {showAppointment?.operator.id} -{" "}
              {showAppointment?.operator.firstName}{" "}
              {showAppointment?.operator.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Commenti
            </p>
            <p className="text-lg font-medium">
              {showAppointment?.appointment.notes}
            </p>
          </div>
        </div>
      </DrawerInput>
    </div>
  );
}
