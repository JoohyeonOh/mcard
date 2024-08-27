import Flex from "./Flex";
import Spacing from "./Spacing";
import Text from "./Text";

export default function FullPageLoader({ message }: { message?: string }) {
  return (
    <Flex
      style={{ position: "fixed", inset: 0 }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          width={120}
          src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
          alt="loader"
        />
        {message && (
          <>
            <Spacing size={12} />
            <Text typography="t4" bold>
              {message}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
}
