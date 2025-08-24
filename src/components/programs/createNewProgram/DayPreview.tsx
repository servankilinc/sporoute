// import React from 'react'
// import { Alert, AlertCircleIcon, AlertIcon, AlertText, Heading, Card, Divider, HStack, Text, VStack } from '@gluestack-ui/themed'
// import { ExerciseTypes } from '../../../models/Exercise/ExerciseTypes';
// import ProgramExerciseResponseModel from '../../../models/Exercise/ProgramExerciseResponseModel';

// class DayPreviewProps {
//     programName?: string;
//     exerciseList?: ProgramExerciseResponseModel[];
// }

// export default function DayPreview({ programName, exerciseList }: DayPreviewProps): React.JSX.Element {

//     return (
//         <Card py="$3" px="$4" borderRadius="$2xl" borderWidth="$0" shadowColor="#969696" m="$3" bgColor="$white">
//             <VStack>
//                 <Heading size="sm" color="#565656">
//                     Preview
//                 </Heading>
//                 <Divider my="$2" bgColor="#f1f1f1" />
//                 <HStack justifyContent='space-between'>
//                     <Text size='xs' fontWeight='$light'>Program Name</Text>
//                     <Text size='xs'>{programName}</Text>
//                 </HStack>
//                 <Divider my="$2" bgColor="#eee" />
//                 {
//                     exerciseList && exerciseList.length > 0 ?
//                         exerciseList.map((data, index) =>
//                             <HStack justifyContent='space-between' key={index}>
//                                 <Text size='xs'>
//                                     {
//                                         data.day == 1 ? "Monday" :
//                                         data.day == 2 ? "Tuesday" :
//                                         data.day == 3 ? "Wednesday" :
//                                         data.day == 4 ? "Thurseday" :
//                                         data.day == 5 ? "Friday" :
//                                         data.day == 6 ? "Saturday" :
//                                         data.day == 7 ? "Sunday" : "No Info"
//                                     }
//                                 </Text>
//                                 <Text size='xs' fontWeight='$bold'>{data.name}</Text>
//                                 <Text size='xs' fontWeight='$bold'>
//                                     {
//                                         data.exerciseType == ExerciseTypes.Weight ?
//                                             `(${data.numberOfSets} x ${data.numberOfRepetition})`
//                                             :
//                                             data.exerciseType == ExerciseTypes.Cardio ?
//                                                 `${data.time / 60} min`
//                                                 :
//                                                 ""
//                                     }
//                                 </Text>
//                             </HStack>
//                         )
//                         :
//                         <Alert my="$2.5" action="warning" variant="solid">
//                             <AlertIcon as={AlertCircleIcon} mr="$3" />
//                             <AlertText size='xs'>
//                                 Not exist any exercise for this day!
//                             </AlertText>
//                         </Alert>
//                 }
//             </VStack>
//         </Card>
//     )
// }
