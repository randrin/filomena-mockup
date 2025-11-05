import DialogModal from "@/components/custom/dialog.modal";
import ToastMessage from "@/components/custom/toast.message";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/mocks/categories.mock";
import { treatments } from "@/mocks/treatments.mock";
import { CategoryType } from "@/types/category.type";
import { TreatmentType } from "@/types/treatment.type";
import { ModeType } from "@/types/util.type";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  MoreHorizontal,
  Pencil,
  PlusIcon,
  Trash,
  Undo2Icon
} from "lucide-react";
import { useEffect, useState } from "react";

const TreatmentsServicesScreen = () => {
  const [mode, setMode] = useState<ModeType>("add");
  const [treatment, setTreatment] = useState<TreatmentType>(
    {} as TreatmentType
  );
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // TODO: Fetch operators from API
  }, []);

  // Desctructure
  const { category, name, duration, price, status, notes, bodyPart } =
    treatment;

  // Action cell for each treatment row
  const actionCell = (treatmentId: string) => {
    return (
      <TableCell className="text-right">
        <DropdownMenu
          open={openRow === treatmentId}
          onOpenChange={(open) => setOpenRow(open ? treatmentId : null)}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          {/* Keep DropdownMenuContent mounted so Radix can control focus */}
          <DropdownMenuContent align="end" className="w-4">
            <AnimatePresence>
              {openRow === treatmentId && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <DropdownMenuItem
                    onClick={() => {
                      setMode("edit");
                      setIsDialogOpen(!isDialogOpen);
                      setTreatment(
                        treatments.find(
                          (t) => t.id === treatmentId
                        ) as TreatmentType
                      );
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" /> Modifica
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setMode("edit");
                      setIsModalOpen(!isModalOpen);
                      setTreatment(
                        treatments.find(
                          (op) => op.id === treatmentId
                        ) as TreatmentType
                      );
                    }}
                    className="text-red-600"
                  >
                    <Trash className="h-4 w-4 mr-2" /> Elimina
                  </DropdownMenuItem>
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    );
  };

  const handleSave = () => {
    // TODO: Save trattamento logic
    setIsDialogOpen(!isDialogOpen);
    ToastMessage({
      message: "Trattamento salvato con successo."
    });
  };

  const handleUpdate = () => {
    // TODO: Update trattamento logic
    setIsDialogOpen(!isDialogOpen);
    ToastMessage({
      message: "Trattamento aggiornato con successo."
    });
  };

  const handleDisabled = () => {
    return (
      !!category?.length &&
      !!name?.length &&
      !!bodyPart?.length &&
      duration !== undefined
    );
  };

  const handleDelete = () => {
    // TODO: Delete trattamento logic
    setIsModalOpen(!isModalOpen);
    ToastMessage({
      message: "Trattamento cancellato con successo."
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div>
            <h1 className="text-2xl font-bold mb-2">Trattamenti</h1>
            <span>Gestisci i trattamenti per prenotazione e stati.</span>
          </div>

          <Button
            variant="default"
            onClick={() => {
              setMode("add");
              setIsDialogOpen(!isDialogOpen);
              setTreatment({} as TreatmentType);
            }}
          >
            <PlusIcon /> <span className="hidden sm:inline">Trattamento</span>
          </Button>
        </div>

        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Codice</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Parte del corpo</TableHead>
                  <TableHead>Durata (min)</TableHead>
                  <TableHead>Prezzo (€)</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="text-right">Azione</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {treatments.map((treatment: TreatmentType) => (
                  <TableRow key={treatment.id}>
                    <TableCell className="font-medium">
                      {treatment.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {treatment.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {treatment.category}
                    </TableCell>
                    <TableCell className="font-medium">
                      {treatment.bodyPart}
                    </TableCell>
                    <TableCell className="font-medium">
                      {treatment.duration}
                    </TableCell>
                    <TableCell className="font-medium">
                      {treatment.price ?? "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          treatment.status === "Active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {treatment.status}
                      </Badge>
                    </TableCell>
                    {actionCell(treatment.id)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog Modal add/edit trattamento */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent style={{ padding: "12px" }}>
            <DialogHeader>
              <DialogTitle>
                {mode === "edit" ? "Modifica Trattamento" : "Nuovo Trattamento"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select
                  name="category"
                  value={category ?? ""}
                  onValueChange={(e) =>
                    setTreatment({ ...treatment!, category: e })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleziona una categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category: CategoryType) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.id} - {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  type="text"
                  name="name"
                  value={name || ""}
                  placeholder="Inserisci il nome"
                  onChange={(e) =>
                    setTreatment({ ...treatment!, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="body">Parti del corpo interessato</Label>
                <Input
                  type="text"
                  name="phone"
                  value={bodyPart ?? ""}
                  placeholder="Inserisci le parti"
                  onChange={(e) =>
                    setTreatment({ ...treatment!, bodyPart: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="status">Stato</Label>
                <br />
                <Switch
                  name="status"
                  checked={status === "Active"}
                  onCheckedChange={(val) =>
                    setTreatment({
                      ...treatment!,
                      status: val ? "Active" : "Inactive"
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Durata (minuti)</Label>
                  <Input
                    type="number"
                    name="duration"
                    value={duration ?? ""}
                    onChange={(e) =>
                      setTreatment({
                        ...treatment!,
                        duration: Number(e.target.value)
                      })
                    }
                    placeholder="Durata in minuti"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Prezzo (€)</Label>
                  <Input
                    type="number"
                    name="price"
                    value={price ?? ""}
                    onChange={(e) =>
                      setTreatment({
                        ...treatment!,
                        price: Number(e.target.value)
                      })
                    }
                    placeholder="Prezzo in €"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Commenti</Label>
                <Textarea
                  id="message"
                  name="notes"
                  value={notes ?? ""}
                  placeholder="Inserisci qui i tuoi appunti..."
                  className="min-h-[100px]"
                  onChange={(e) =>
                    setTreatment({ ...treatment!, notes: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="w-[100px] mr-3"
                onClick={() => setIsDialogOpen(false)}
              >
                <Undo2Icon /> Annulla
              </Button>
              <Button
                onClick={mode === "edit" ? handleUpdate : handleSave}
                disabled={!handleDisabled()}
                className="w-[100px]"
              >
                {mode === "edit" ? (
                  <span className="flex items-center">
                    <Pencil className="mr-2" /> Modifica
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Activity className="mr-2" /> Salva
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal delete trattamento */}
        <DialogModal
          title="Sei assolutamente sicuro?"
          description="Questa azione non può essere annullata. Il trattamento verrà eliminato definitivamente."
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          position="top"
          onConfirm={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default TreatmentsServicesScreen;
