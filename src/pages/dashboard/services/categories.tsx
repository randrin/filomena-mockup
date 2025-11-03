import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { categories } from "@/mocks/categories.mock";
import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const CategoriesServicesScreen = () => {
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
            <h1 className="text-2xl font-bold mb-2">Categories</h1>
            <span>Manage categories of treatments and services</span>
          </div>
          <Button
            variant="outline"
            className="w-40"
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          >
            ➕ Add Category
          </Button>
        </div>

        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
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
              <DialogTitle>{"Category"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" placeholder="Category name" />
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

export default CategoriesServicesScreen;
