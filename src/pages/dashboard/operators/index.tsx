import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { operators } from "@/pages/mocks/operators.mock";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  MoreHorizontal,
  Pencil,
  Trash,
  X
} from "lucide-react";
import { useState } from "react";

const OperatorsScrren = () => {
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
            <h1 className="text-2xl font-bold mb-2">Operators</h1>
            <span>Manage your operators and their statuses.</span>
          </div>

          <Button
            variant="outline"
            className="w-40"
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          >
            ➕ Add Operator
          </Button>
        </div>

        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Preferred Operator</TableHead>
                  <TableHead>Unqualified Operator</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
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
              <DialogTitle>{"Operator"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input type="text" placeholder="Enter first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input type="text" placeholder="Enter last name" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div>
                <Label htmlFor="price">Phone (Optional)</Label>
                <Input type="text" placeholder="Enter phone" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferred">Preferred Operator</Label>
                  <RadioGroup className="mt-2 flex flex-row gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"true"} id="preferred-yes" />
                      <Label htmlFor="preferred-yes" className="cursor-pointer">
                        Yes
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
                  <Label htmlFor="unqualified">Unqualified Operator</Label>
                  <RadioGroup className="mt-2 flex flex-row gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"true"} id="unqualified-yes" />
                      <Label
                        htmlFor="unqualified-yes"
                        className="cursor-pointer"
                      >
                        Yes
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

export default OperatorsScrren;
