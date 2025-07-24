import { useState } from "preact/hooks";
import { ThemedButton } from "./components/Button";
import { Recharge } from "./components/Recharge";
import register from "preact-custom-element";
import { createOnlineRecharge } from "../../../api";
import { t } from "../../../local";

export function BestUnit() {
  const [visible, setVisible] = useState(false);
  const handleSubmit = async (form: {
    amount: string;
    rechargeChannel: string;
    currency: string;
  }) => {
    const result = await createOnlineRecharge({
      amount: form.amount,
      currency: form.currency,
      rechargeChannel: form.rechargeChannel,
    });
    window.open(result, "_blank");
  };

  return (
    <div>
      <ThemedButton onClick={() => setVisible(true)}>
        {t("充值/转账")}
      </ThemedButton>
      <Recharge
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

register(BestUnit, "best-recharge", ["theme"], { shadow: false });

export default BestUnit;
