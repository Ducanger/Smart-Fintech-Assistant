import { Component, OnInit } from "@angular/core";
import { BankApiService } from "../../services/bankApi/bank-api.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-transfer",
  templateUrl: "./transfer.page.html",
  styleUrls: ["./transfer.page.scss"],
})
export class TransferPage implements OnInit {
  bankList: any[];
  constructor(private bankApiService: BankApiService) {}

  onSubmit() {
  }

  ngOnInit() {}
}
