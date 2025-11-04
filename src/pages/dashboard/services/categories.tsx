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
import { CategoryType } from "@/types/category.type";
import { ModeType } from "@/types/util.type";
import { dateFromNow } from "@/utils/common.utils";
import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal, Pencil, PlusIcon, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

const CategoriesServicesScreen = () => {
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryType>({} as CategoryType);
  const [mode, setMode] = useState<ModeType>("add");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // TODO: Fetch operators from API
  }, []);

  // Desctructure
  const { name, status, notes } = category;

  // Action cell for each operator
  const actionCell = (categoryId: string) => {
    return (
      <TableCell className="text-right">
        <DropdownMenu
          open={openRow === categoryId}
          onOpenChange={(open) => setOpenRow(open ? categoryId : null)}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          {/* Keep DropdownMenuContent mounted so Radix can control focus */}
          <DropdownMenuContent align="end" className="w-4">
            <AnimatePresence>
              {openRow === categoryId && (
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
                      setCategory(
                        categories.find(
                          (c) => c.id === categoryId
                        ) as CategoryType
                      );
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" /> Modifica
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setMode("edit");
                      setIsModalOpen(!isModalOpen);
                      setCategory(
                        categories.find(
                          (c) => c.id === categoryId
                        ) as CategoryType
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
    // TODO: Save category logic
    setIsDialogOpen(!isDialogOpen);
    ToastMessage({
      message: "Categoria salvata con successo."
    });
  };

  const handleUpdate = () => {
    // TODO: Update category logic
    setIsDialogOpen(!isDialogOpen);
    ToastMessage({
      message: "Categoria aggiornata con successo."
    });
  };

  const handleDelete = () => {
    // TODO: Delete operator logic
    setIsModalOpen(!isModalOpen);
    ToastMessage({
      message: "Categoria eliminata con successo."
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div>
            <h1 className="text-2xl font-bold mb-2">Categorie</h1>
            <span>Gestire categorie di trattamenti e servizi.</span>
          </div>
          <Button
            variant="default"
            className="w-40"
            onClick={() => {
              setIsDialogOpen(!isDialogOpen);
              setMode("add");
              setCategory({} as CategoryType);
            }}
          >
            <PlusIcon /> Categoria
          </Button>
        </div>

        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Data di creazione</TableHead>
                  <TableHead className="text-right">Azione</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          category.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {dateFromNow(category.createdAt)}
                    </TableCell>
                    {actionCell(category.id)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog Modal for Add/Update */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent style={{ padding: "12px" }}>
            <DialogHeader>
              <DialogTitle>
                {mode === "edit" ? "Modifica categoria" : "Nuova categoria"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  type="text"
                  name="name"
                  value={name ?? ""}
                  onChange={(e) =>
                    setCategory({ ...category!, name: e.target.value })
                  }
                  placeholder="Inserisci il nome"
                />
              </div>
              <div>
                <Label htmlFor="status">Stato</Label>
                <br />
                <Switch
                  name="status"
                  checked={status === "Active"}
                  onCheckedChange={(val) =>
                    setCategory({
                      ...category!,
                      status: val ? "Active" : "Inactive"
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="notes">Commenti</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={notes ?? ""}
                  onChange={(e) =>
                    setCategory({ ...category!, notes: e.target.value })
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
                <X /> Cancella
              </Button>
              <Button
                onClick={mode === "edit" ? handleUpdate : handleSave}
                className="w-[100px]"
                disabled={!name}
              >
                {mode === "edit" ? (
                  <span className="flex items-center">
                    <Pencil className="mr-2" /> Modifica
                  </span>
                ) : (
                  <span className="flex items-center">
                    <PlusIcon className="mr-2" /> Salva
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal delete category */}
        <DialogModal
          title="Sei assolutamente sicuro?"
          description="Questa azione non può essere annullata. La categoria verrà eliminata definitivamente."
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          position="top"
          onConfirm={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default CategoriesServicesScreen;
