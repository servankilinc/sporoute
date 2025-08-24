import {FormControl, FormControlErrorIcon, FormControlErrorText} from '@/components/ui/form-control';
import {Text} from '@/components/ui/text';
import {Input, InputField} from '@/components/ui/input';
import {HStack} from '@/components/ui/hstack';
import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button';
import {VStack} from '@/components/ui/vstack';
import {useFormik} from 'formik';
import ProgramResponseDto from '@/src/models/program/ProgramResponseDto';
import {StepperProps} from './Stepper';
import {useState} from 'react';
import CreateProgramRequest, {CreateProgramValidation} from '@/src/models/program/CreateProgramRequest';
import programService from '@/src/database/services/programService';
import {AlertCircleIcon} from '@/components/ui/icon';
import { ThemedView } from '../../global';
import { ThemedButton } from '../../global/ThemedButton';

type SectionProps = {
  stepps: StepperProps[];
  swipeToStep: (step: number) => void;
  setCreatedProgram: React.Dispatch<React.SetStateAction<ProgramResponseDto | undefined>>;
};

export default function FormProgramCreate(props: SectionProps) {
  const [isPending, setIsPending] = useState(false);

  const formik = useFormik({
    initialValues: new CreateProgramRequest('', ''),
    validationSchema: CreateProgramValidation,
    onSubmit: async values => {
      try {
        setIsPending(true);
        const createdProgram = await programService.Save(values);
        if (createdProgram == null) {
          throw new Error();
        }
        props.setCreatedProgram(createdProgram);

        props.swipeToStep(2);
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <ThemedView className='gap-6 p-7'>
      <VStack space="xs">
        <Text>Program Name</Text>
        <Input isInvalid={(formik.touched.name || formik.submitCount > 0) && formik.errors.name ? true : false} variant="outline" size="md">
          <InputField value={formik.values.name} onChangeText={formik.handleChange('name')} onBlur={formik.handleBlur('name')} />
        </Input>
        {(formik.touched.name || formik.submitCount > 0) && formik.errors.name && (
          <HStack className="items-center" space="xs">
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{formik.errors.name}</FormControlErrorText>
          </HStack>
        )}
      </VStack>
      <ThemedButton style={{alignSelf:"flex-start"}} text='Create' isPending={isPending} isDisabled={isPending} onPress={() => formik.handleSubmit()}/>
    </ThemedView>
  );
}
