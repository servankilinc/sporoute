import { VStack } from "@/components/ui/vstack";
import { useColors } from "@/src/hooks";
import { ThemedText } from "../global";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

function TriggerInput(props: { label: string; value: number; method: (value: number) => void; }) 
{
  const colors = useColors();
  return (
    <VStack>
      <ThemedText className="text-xs font-bold ml-1 mb-1" type="custom">
        {props.label}
      </ThemedText>
      <HStack className="rounded-[13] items-center gap-2 p-1 bg-stone-200 dark:bg-stone-800">
        <Pressable className="rounded-[11] p-2 bg-stone-50 dark:bg-stone-500" onLongPress={() => props.method(0)} onPress={() => props.method(-1)}>
          <FontAwesome6 name="minus" iconStyle="solid" color={colors.text} size={11} />
        </Pressable>
        <ThemedText className="mx-2 font-bold" type="custom">
          {props.value}
        </ThemedText>
        <Pressable className="rounded-[11] p-2  bg-stone-50 dark:bg-stone-500" onLongPress={() => props.method(15)} onPress={() => props.method(1)}>
          <FontAwesome6 name="plus" iconStyle="solid" color={colors.text} size={11} />
        </Pressable>
      </HStack>
    </VStack>
  );
}

export default TriggerInput;