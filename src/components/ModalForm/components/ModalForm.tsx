import { useState, useEffect } from 'preact/hooks';

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (form: { amount: string; rechargeChannel: string; currency: string }) => Promise<void>;
  color?: string;
}

export function ModalForm({ visible, onClose, onSubmit, color }: ModalFormProps) {
  const [formState, setFormState] = useState({
    amount: '',
    rechargeChannel: 'paypal',
    currency: 'USD',
    loading: false,
    error: '',
    amountError: '',
    rechargeChannelError: '',
    currencyError: ''
  });

  // 每次关闭弹窗时重置内容
  useEffect(() => {
    if (!visible) {
      setFormState({
        amount: '',
        rechargeChannel: 'paypal',
        currency: 'USD',
        loading: false,
        error: '',
        amountError: '',
        rechargeChannelError: '',
        currencyError: ''
      });
    }
  }, [visible]);

  if (!visible) return null;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    let valid = true;
    setFormState(state => ({ ...state, amountError: '', rechargeChannelError: '' }));
    if (!formState.amount.trim()) {
      setFormState(state => ({ ...state, amountError: '请输入充值金额' }));
      valid = false;
    }
    if (!formState.rechargeChannel) {
      setFormState(state => ({ ...state, rechargeChannelError: '请选择支付平台' }));
      valid = false;
    }
    if (!valid) return;
    setFormState(state => ({ ...state, loading: true, error: '' }));
    try {
      await onSubmit({ amount: formState.amount, rechargeChannel: formState.rechargeChannel, currency: formState.currency });
      onClose();
    } catch {
      setFormState(state => ({ ...state, error: '提交失败，请重试' }));
    } finally {
      setFormState(state => ({ ...state, loading: false }));
    }
  };

  // 点击弹窗外部关闭
  const handleMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
      }}
      onClick={handleMaskClick}
    >
      <form
        onSubmit={handleSubmit}
        style={{ background: '#181A20', padding: 32, borderRadius: 12, minWidth: 360,
             color: color || '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.5)', 
             position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute', right: 16, top: 16, background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', lineHeight: 1
          }}
          aria-label="关闭"
        >
          ×
        </button>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 24, textAlign: 'left' }}>在线充值</div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ marginBottom: 8, fontSize: 14 }}><span style={{ color: '#00E8C6' }}>*</span> 充值金额</div>
          <input
            type="text"
            placeholder="请输入充值金额"
            value={formState.amount}
            onInput={e => {
              const value = (e.target as HTMLInputElement).value;
              setFormState(state => ({
                ...state,
                amount: value,
                amountError: value.trim() ? '' : state.amountError
              }));
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 6,
              boxSizing: 'border-box',
              border: formState.amountError ? '1px solid #ff4d4f' : '1px solid #23262F',
              background: '#23262F',
              color: '#fff',
              fontSize: 15,
              outline: 'none',
              marginBottom: 0
            }}
          />
          {formState.amountError && <div style={{ color: '#ff4d4f', fontSize: 13, marginTop: 4 }}>{formState.amountError}</div>}
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ marginBottom: 8, fontSize: 14 }}><span style={{ color: '#00E8C6' }}>*</span> 支付平台</div>
          <select
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 6,
              border: formState.rechargeChannelError ? '1px solid #ff4d4f' : '1px solid #23262F',
              background: '#23262F',
              color: '#fff',
              fontSize: 15,
              outline: 'none'
            }}
            value={formState.rechargeChannel}
            onInput={e => {
              const value = (e.target as HTMLSelectElement).value;
              setFormState(state => ({
                ...state,
                rechargeChannel: value,
                rechargeChannelError: value ? '' : state.rechargeChannelError
              }));
            }}
          >
            <option value="alipay">支付宝</option>
            <option value="wechat">微信</option>
            <option value="paypal">PayPal</option>
          </select>
          {formState.rechargeChannelError && <div style={{ color: '#ff4d4f', fontSize: 13, marginTop: 4 }}>{formState.rechargeChannelError}</div>}
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ marginBottom: 8, fontSize: 14 }}>币种</div>
          <select
            style={{ width: '100%', padding: '10px 12px', borderRadius: 6,
                 border: '1px solid #23262F', background: '#23262F', 
                 color: '#fff', fontSize: 15, outline: 'none' }}
            value={formState.currency}
          >
            <option value="USD">USD</option>
            <option value="CNY">CNY</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        {formState.error && <div style={{ color: '#ff4d4f', marginBottom: 12 }}>{formState.error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button
            type="button"
            onClick={onClose}
            style={{ background: '#23262F', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontSize: 15, cursor: 'pointer' }}
          >
            取消
          </button>
          <button
            type="submit"
            disabled={formState.loading}
            style={{ background: '#00E8C6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontSize: 15, cursor: 'pointer', fontWeight: 600 }}
          >
            {formState.loading ? '提交中...' : '去支付'}
          </button>
        </div>
      </form>
    </div>
  );
} 