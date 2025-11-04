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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { operators } from "@/mocks/operators.mock";
import { OperatorType } from "@/types/operator.type";
import { ModeType } from "@/types/util.type";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  MoreHorizontal,
  Pencil,
  PlusIcon,
  Trash,
  UserRoundPlus,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

const OperatorsScreen = () => {
  const [mode, setMode] = useState<ModeType>("add");
  const [operator, setOperator] = useState<OperatorType | null>(null);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // TODO: Fetch operators from API
  }, []);

  // Desctructure
  const { firstName, lastName, email, phone, preferred, unqualified, notes } =
    operator || {};

  // Action cell for each operator
  const actionCell = (operatorId: string) => {
    return (
      <TableCell className="text-right">
        <DropdownMenu
          open={openRow === operatorId}
          onOpenChange={(open) => setOpenRow(open ? operatorId : null)}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          {/* Keep DropdownMenuContent mounted so Radix can control focus */}
          <DropdownMenuContent align="end" className="w-4">
            <AnimatePresence>
              {openRow === operatorId && (
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
                      setOperator(
                        operators.find((op) => op.id === operatorId) || null
                      );
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" /> Modifica
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setMode("edit");
                      setIsModalOpen(!isModalOpen);
                      setOperator(
                        operators.find((op) => op.id === operatorId) || null
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
    // TODO: Save operator logic
    setIsDialogOpen(!isDialogOpen);
    ToastMessage({
      message: "Operatore salvato con successo."
    });
  };

  const handleUpdate = () => {
    // TODO: Update operator logic
    setIsDialogOpen(!isDialogOpen);
    ToastMessage({
      message: "Operatore aggiornato con successo."
    });
  };

  const handleDisabled = () => {
    return (
      !!firstName?.length &&
      !!lastName?.length &&
      preferred !== undefined &&
      unqualified !== undefined
    );
  };

  const handleDelete = () => {
    // TODO: Delete operator logic
    setIsModalOpen(!isModalOpen);
    ToastMessage({
      message: "Operatore cancellato con successo."
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div>
            <h1 className="text-2xl font-bold mb-2">Operatori</h1>
            <span>Gestisci i tuoi operatori e i loro stati.</span>
          </div>

          <Button
            variant="default"
            className="w-40"
            onClick={() => {
              setMode("add");
              setIsDialogOpen(!isDialogOpen);
              setOperator(null);
            }}
          >
            <PlusIcon /> Operatore
          </Button>
        </div>

        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Codice</TableHead>
                  <TableHead>Nome e cognome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefono</TableHead>
                  <TableHead>Operatrice di preferenza</TableHead>
                  <TableHead>Operatrice non abilitata</TableHead>
                  <TableHead>Ordine</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="text-right">Azione</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operators.map((operator) => (
                  <TableRow key={operator.id}>
                    <TableCell className="font-medium">{operator.id}</TableCell>
                    <TableCell className="font-medium">
                      {operator.firstName} {operator.lastName}
                    </TableCell>
                    <TableCell className="font-medium">
                      {operator.email ?? "-"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {operator.phone ?? "-"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {operator.preferred ? (
                        <Check className="text-green-600" />
                      ) : (
                        <X className="text-red-600" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {operator.unqualified ? (
                        <Check className="text-green-600" />
                      ) : (
                        <X className="text-red-600" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {operator.order ?? "-"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          operator.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {operator.status}
                      </Badge>
                    </TableCell>
                    {actionCell(operator.id)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog Modal add/edit operator */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent style={{ padding: "12px" }}>
            <DialogHeader>
              <DialogTitle>
                {mode === "edit" ? "Modifica operatore" : "Nuovo operatore"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={firstName ?? ""}
                    placeholder="Inserisci il nome"
                    onChange={(e) =>
                      setOperator({ ...operator!, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Cognome</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={lastName ?? ""}
                    placeholder="Inserisci il cognome"
                    onChange={(e) =>
                      setOperator({ ...operator!, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email (Opzionale)</Label>
                <Input
                  type="email"
                  name="email"
                  value={email ?? ""}
                  placeholder="Inserisci email"
                  onChange={(e) =>
                    setOperator({ ...operator!, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefono (Opzionale)</Label>
                <Input
                  type="text"
                  name="phone"
                  value={phone ?? ""}
                  placeholder="Inserisci il telefono"
                  onChange={(e) =>
                    setOperator({ ...operator!, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="status">Stato</Label>
                <br />
                <Switch
                  name="status"
                  checked={operator?.status === "Active"}
                  onCheckedChange={(val) =>
                    setOperator({
                      ...operator!,
                      status: val ? "Active" : "Inactive"
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferred">Operatrice di preferenza</Label>
                  <RadioGroup
                    name="preferred"
                    value={String(operator?.preferred)}
                    onValueChange={(val) =>
                      setOperator({
                        ...operator!,
                        preferred: val === "true"
                      })
                    }
                    className="mt-2 flex flex-row gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"true"} id="preferred-yes" />
                      <Label htmlFor="preferred-yes" className="cursor-pointer">
                        Si
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"false"} id="preferred-false" />
                      <Label
                        htmlFor="preferred-false"
                        className="cursor-pointer"
                      >
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="unqualified">Operatrice non abilitata</Label>
                  <RadioGroup
                    name="preferred"
                    value={String(operator?.unqualified)}
                    onValueChange={(val) =>
                      setOperator({
                        ...operator!,
                        unqualified: val === "true"
                      })
                    }
                    className="mt-2 flex flex-row gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"true"} id="unqualified-yes" />
                      <Label
                        htmlFor="unqualified-yes"
                        className="cursor-pointer"
                      >
                        Si
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"false"} id="unqualified-false" />
                      <Label
                        htmlFor="unqualified-false"
                        className="cursor-pointer"
                      >
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Commenti</Label>
                <Textarea
                  id="message"
                  name="notes"
                  value={notes ?? ""}
                  onChange={(e) =>
                    setOperator({ ...operator!, notes: e.target.value })
                  }
                  placeholder="Inserisci qui i tuoi appunti..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="w-[100px] mr-3"
                onClick={() => setIsDialogOpen(false)}
              >
                <X />
                Cancella
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
                    <UserRoundPlus className="mr-2" /> Salva
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal delete operator */}
        <DialogModal
          title="Sei assolutamente sicuro?"
          description="Questa azione non può essere annullata. L'operatore verrà eliminato definitivamente."
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          position="top"
          onConfirm={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default OperatorsScreen;
