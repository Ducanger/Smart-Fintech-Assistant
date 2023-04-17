import { Component, Input, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { BankApiService } from "../../services/bankApi/bank-api.service";

@Component({
  selector: "app-transfer-card",
  templateUrl: "./transfer-card.component.html",
  styleUrls: ["./transfer-card.component.scss"],
})
export class TransferCardComponent {
  transferRecipient: string;
  @Input()
  transferAccountNumber: string;
  @Input()
  transferBankName: string;
  transferAmount: number;

  constructor(
    private modalCtrl: ModalController,
    private bankApiService: BankApiService,
    private navCtrl: NavController
  ) {}

  cancel() {
    // close the modal
    this.modalCtrl.dismiss(null, "cancel");
  }

  confirm() {
    // change to transfer page
    this.modalCtrl.dismiss(null, "confirm");
    this.goToTransferPage();
  }

  goToTransferPage() {
    console.log(
      "transfer?" +
        (this.transferRecipient
          ? "transferRecipient=" + this.transferRecipient + "&"
          : "") +
        (this.transferAccountNumber
          ? "transferAccountNumber=" + this.transferAccountNumber + "&"
          : "") +
        (this.transferBankName
          ? "transferBankName=" + this.transferBankName + "&"
          : "") +
        (this.transferAmount ? "transferAmount=" + this.transferAmount : "")
    );
    this.navCtrl.navigateForward(
      "transfer?" +
        (this.transferRecipient
          ? "transferRecipient=" + this.transferRecipient + "&"
          : "") +
        (this.transferAccountNumber
          ? "transferAccountNumber=" + this.transferAccountNumber + "&"
          : "") +
        (this.transferBankName
          ? "transferBankName=" + this.transferBankName + "&"
          : "") +
        (this.transferAmount ? "transferAmount=" + this.transferAmount : "")
    );
  }
  ngOnInit() {
    //set the name of the recipient
    this.transferRecipient = "NGUYEN GIA CAT THANH";
    this.transferAmount = 1000000;
    this.transferBankName = "BIDV";
    this.transferAccountNumber = "0987515150";
  }
}
