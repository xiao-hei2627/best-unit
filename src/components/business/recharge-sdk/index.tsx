import { useState } from "preact/hooks";
import { ThemedButton } from "./components/Button";
import { Recharge } from "./components/recharge";
import register from "preact-custom-element";
import { createOnlineRecharge, getAllDicts } from "../../../api";
getAllDicts();

export function BestUnit(props: any) {
  const [visible, setVisible] = useState(false);
  const [whiteTheme, setWhiteTheme] = useState(true);
  const color = props.theme?.primaryColor;
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
      <ThemedButton color={color} onClick={() => setVisible(true)}>
        打开表单
      </ThemedButton>
      <button
        style={{
          marginLeft: 16,
          padding: "8px 16px",
          borderRadius: 6,
          border: "1px solid #eee",
          cursor: "pointer",
        }}
        onClick={() => setWhiteTheme((v) => !v)}
      >
        {whiteTheme ? "切换为暗黑主题" : "切换为白色主题"}
      </button>
      <Recharge
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
        color={color}
        whiteTheme={whiteTheme}
      />
    </div>
  );
}

register(BestUnit, "x-best-modal-form", ["theme"], { shadow: false });

export default BestUnit;
