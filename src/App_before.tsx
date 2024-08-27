import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Text from "@shared/Text";
import Button from "./components/shared/Button";
import Input from "./components/shared/Input";
import TextField from "./components/shared/TextField";
import Alert from "./components/shared/Alert";

import { useAlertContext } from "@contexts/AlertContext";

const bold = css`
  font-weight: bold;
`;

const containerStyles = css`
  background-color: white;
`;

// const Button = styled.button`
//   width: 200px;
//   height: 100px;
//   ${bold}
// `;

function App() {
  const { open } = useAlertContext();

  return (
    <div css={containerStyles}>
      hihi
      <Button>스타일버튼</Button>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2" display="block" color="blue">
        t2
      </Text>
      <Text typography="t3" display="block" color="gray">
        t3
      </Text>
      <Text typography="t4" display="block" color="green">
        t4
      </Text>
      <Text typography="t5" display="block" color="black">
        t5
      </Text>
      <button>그냥 버튼</button>
      <Button>버튼</Button>
      <Button color="success" size="large" weak>
        버튼
      </Button>
      <Button color="error" size="medium" full>
        버튼
      </Button>
      <Input placeholder="정보 입력" />
      <Input aria-invalid />
      <TextField label="아이디" />
      <TextField
        label="패스워드"
        hasError
        helpMessage="패스워드 길이는 8자 이상으로 해주세요"
      />
      <Button
        onClick={() => {
          open({
            title: "카드신청 완료",
            description: "안녕하세요",
            onButtonClick: () => {},
          });
        }}
      >
        Alert오픈
      </Button>
      {/* // <Alert
      //   open={true}
      //   title="알림창"
      //   description="안녕하세요"
      //   onButtonClick={() => {}}
      // /> */}
    </div>
  );
}

export default App;
