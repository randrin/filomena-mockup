import DrawerInput from "@/components/custom/drawer-input";
import TooltipMessage from "@/components/custom/tooltip.message";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { customers } from "@/mocks/customers.mock";
import { CustomerType } from "@/types/customer.type";
import { Eye, Info } from "lucide-react";
import { useState } from "react";

const ClientsScreen = () => {
  const [customer, setCustomer] = useState<CustomerType>();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const handleView = (clientId: string) => {
    setIsOpenDialog(!isOpenDialog);
    setCustomer(customers.find((customer) => customer.id === clientId));
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 gap-2">
          <div>
            <h1 className="text-2xl font-bold mb-2">Clienti</h1>
            <span>Elenco dei clienti nel sistema</span>
          </div>
        </div>

        <Card className="w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Codice</TableHead>
                  <TableHead>Nome e Cognome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefono</TableHead>
                  <TableHead>Whatsapp</TableHead>
                  <TableHead className="flex items-center gap-2">
                    Allergie/Patologie{" "}
                    <TooltipMessage
                      trigger={<Info className="h-3 w-3" />}
                      content="Utile da sapere per il trattamento"
                    />
                  </TableHead>
                  <TableHead>Preferenza</TableHead>
                  <TableHead className="text-right">Azione</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer: CustomerType) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell className="font-medium">
                      {customer.firstName} {customer.lastName}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.whatsApp}</TableCell>
                    <TableCell>{customer.pathology}</TableCell>
                    <TableCell>
                      <Badge variant={"secondary"}>{customer.preference}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(customer.id)}
                      >
                        <Eye /> Vedi
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Drawer per visualizzare il dettaglio del cliente */}
      <DrawerInput
        open={isOpenDialog}
        setOpen={setIsOpenDialog}
        position="right"
        title="Dettaglio Cliente"
      >
        <div className="m-4 flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Codice
            </p>
            <p className="text-lg font-medium">{customer?.id}</p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Nome e Cognome
            </p>
            <p className="text-lg font-medium">
              {customer?.firstName} {customer?.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Email
            </p>
            <p className="text-lg font-medium">{customer?.email}</p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Telofono
            </p>
            <p className="text-lg font-medium">{customer?.phone}</p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Whatsapp
            </p>
            <p className="text-lg font-medium">{customer?.whatsApp}</p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Allergie/Patologie
            </p>
            <p className="text-lg font-medium">{customer?.pathology}</p>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Preferenza
            </p>
            <Badge variant={"secondary"}>{customer?.preference}</Badge>
          </div>
          <div>
            <p className="text-sm font-semibold dark:text-muted-foreground">
              Commenti
            </p>
            <p className="text-lg font-medium">
              {customer?.notes || "Nessun commento"}
            </p>
          </div>
        </div>
      </DrawerInput>
    </DashboardLayout>
  );
};

export default ClientsScreen;
