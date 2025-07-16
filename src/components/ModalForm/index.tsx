import { useState } from 'preact/hooks';
import { ThemedButton } from './components/Button';
import { ModalForm } from './components/ModalForm';
import register from 'preact-custom-element';

export function BestUnit(props: any) {
  const [visible, setVisible] = useState(false);
  const color = props.theme?.primaryColor;

  const handleSubmit = async (form: { amount: string; rechargeChannel: string; currency: string }) => {
    console.log('submit', form);
  };

  return (
    <div>
      <ThemedButton color={color} onClick={() => setVisible(true)}>
        打开表单
      </ThemedButton>
      <ModalForm
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
        color={color}
      />
    </div>
  );
}


register(BestUnit, 'x-best-modal-form', ['theme'], { shadow: false });

export default BestUnit;
