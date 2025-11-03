import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { countries } from "@/pages/mocks/utils.mock";

export function PhoneInput() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phone, setPhone] = useState("");

  return (
    <div className="flex w-full max-w-md items-center gap-2">
      <Select
        value={selectedCountry.code}
        onValueChange={(val) =>
          setSelectedCountry(
            countries.find((c) => c.code === val) || countries[0]
          )
        }
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              <span className="flex items-center gap-2">
                <span>{c.flag}</span>
                <span>{c.dial_code}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="flex-1"
      />
    </div>
  );
}
