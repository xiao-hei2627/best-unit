import { npmTest, printCurrentTime } from "../main";
import { BestUnit } from "../components/business/recharge-sdk";
import { initFundUnit } from "../main";

export default function DemoApp() {
  initFundUnit({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTM0MTM1MjksIm1lcmNoYW50X2lkIjoxMTI4LCJ0aW1lc3RhbXAiOjE3NTMxNTQzMjl9.UAvzq0P4HCnbJR1Ga3CgF6q3vk2RHiZRvnAFohBTHpw",
    merchant_id: "1128",
    biz_type: "ad",
    userId: "123",
  });

  return (
    <div>
      <h2>组件库可视化测试</h2>
      <div>
        <h3>BestUnit 组件演示：</h3>
        <BestUnit
          theme={{ primaryColor: "#6366f1" }}
          merchant_id="1128"
          biz_type="ad"
          token="123"
        />
      </div>
      <div>
        <h3>方法演示：</h3>
        <button onClick={npmTest} style={{ marginRight: 10 }}>
          调用 npmTest()
        </button>
        <button onClick={printCurrentTime}>调用 printCurrentTime()</button>
      </div>
    </div>
  );
}
