import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { treatments } from "@/pages/mocks/treatments.mock";
import { TreatmentType } from "@/pages/types/treatment.type";
import { CategoryType } from "@/pages/types/category.type";
import { categories } from "@/pages/mocks/categories.mock";
import { Card, CardContent } from "@/components/ui/card";

const TreatmentsServicesScreen = () => {
  const [openAction, setOpenAction] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const actionCell = () => {
    return (
      <TableCell className="text-right">
        <DropdownMenu open={openAction} onOpenChange={setOpenAction}>
          <DropdownMenuTrigger asChild>
            <div
              onMouseEnter={() => setOpenAction(true)}
              onMouseLeave={() => setOpenAction(false)}
              className="cursor-pointer"
            >
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>

          <AnimatePresence>
            {openAction && (
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuContent
                  align="end"
                  asChild
                  onMouseEnter={() => setOpenAction(true)}
                  onMouseLeave={() => setOpenAction(false)}
                  className="w-48"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <DropdownMenuItem
                      onClick={() => console.log("Edit clicked")}
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Delete clicked")}
                      className="text-red-600"
                    >
                      <Trash className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </motion.div>
                </DropdownMenuContent>
              </DropdownMenuContent>
            )}
          </AnimatePresence>
        </DropdownMenu>
      </TableCell>
    );
  };

  const handleSave = () => {
    //setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div>
            <h1 className="text-2xl font-bold mb-2">Treatments</h1>
            <span>Manage treatments for booking and statuses</span>
          </div>

          <Button
            variant="outline"
            className="w-40"
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          >
            ➕ Add Treatment
          </Button>
        </div>

        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration (min)</TableHead>
                  <TableHead>Price (€)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
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
                    {actionCell()}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent style={{ padding: "12px" }}>
            <DialogHeader>
              <DialogTitle>{"Treatment "}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category: CategoryType) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" placeholder="Treatment name" />
              </div>
              <div>
                <Label htmlFor="body">Parte of the body</Label>
                <Input type="text" placeholder="Interessed body part" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input type="number" placeholder="Duration in minutes" />
                </div>
                <div>
                  <Label htmlFor="price">Price (€)</Label>
                  <Input type="number" placeholder="Price in €" />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
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
                Cancel
              </Button>
              <Button onClick={handleSave} className="w-[100px]">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default TreatmentsServicesScreen;
