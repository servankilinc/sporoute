// exerciseType: 1 - Ağırlık/Strength egzersizleri (set)
// exerciseType: 2 - Core/Stabilizasyon egzersizleri (time)
// exerciseType: 3 - Kardiyo egzersizleri

export const data = [
  {
    exercise: {
      id: '9a052804-e7ea-42f2-b641-08dcd49355fd',
      name: 'Barbell Curl',
      content: '9a052804-e7ea-42f2-b641-08dcd49355fd.jpg',
      description: 'Simple description of the purpose of this exercise..',
      exerciseType: 1,
    },
    regions: [
      {id: '89e28c3a-078a-4c59-5501-08dcd4c2abcb'}, // Biceps
      {id: 'a436ccf0-e8f7-4fe9-5507-08dcd4c2abcb'}, // Forearms
    ],
  },
  {
    exercise: {
      id: 'b45a0b7b-231a-42f4-a551-08dcd49356af',
      name: 'Bench Press',
      content: 'b45a0b7b-231a-42f4-a551-08dcd49356af.jpg',
      description: 'A foundational exercise for building strength in the upper body.',
      exerciseType: 1,
    },
    regions: [
      {id: '02764bc5-8138-4e3c-5502-08dcd4c2abcb'}, // Chest
      {id: '02c74030-cf5e-40c4-5500-08dcd4c2abcb'}, // Shoulders
      {id: '78821fd2-223e-46ee-5508-08dcd4c2abcb'}, // Triceps
    ],
  },
  {
    exercise: {
      id: 'c2c525f0-621e-451e-a552-08dcd49356cd',
      name: 'Overhead Squat',
      content: 'c2c525f0-621e-451e-a552-08dcd49356cd.jpg',
      description: 'A full-body exercise that targets multiple muscle groups.',
      exerciseType: 1,
    },
    regions: [
      {id: 'a699d914-362c-43e4-550c-08dcd4c2abcb'}, // Quadriceps
      {id: 'f2bc0a83-654f-495f-5503-08dcd4c2abcb'}, // Calves
      {id: '02c74030-cf5e-40c4-5500-08dcd4c2abcb'}, // Shoulders
    ],
  },
  {
    exercise: {
      id: '8c773121-72f3-4a6c-a553-08dcd49356e9',
      name: 'Running',
      content: '8c773121-72f3-4a6c-a553-08dcd49356e9.jpg',
      description: 'An effective cardio exercise for improving endurance.',
      exerciseType: 2, // Assuming 2 represents cardio
    },
    regions: [
      {id: 'aa9d4d2d-9ee7-43d0-3a84-08dcd81e6fed'}, // Cardio
    ],
  },
  {
    exercise: {
      id: '1d86d525-2e65-4f40-a555-08dcd493571d',
      name: 'Plank',
      content: '1d86d525-2e65-4f40-a555-08dcd493571d.jpg',
      description: 'A core-strengthening exercise that improves posture.',
      exerciseType: 2,
    },
    regions: [
      {id: 'bc1e8801-f11d-421e-5504-08dcd4c2abcb'}, // Upper Abdominals
      {id: 'cb3c7a70-cf41-485c-5505-08dcd4c2abcb'}, // Lower Abdominals
      {id: '85758791-3ba1-4e9e-5506-08dcd4c2abcb'}, // Side Abs
    ],
  },
  {
    exercise: {
      id: '9f9a2b5e-402a-41f3-a554-08dcd4935701',
      name: 'Leg Press',
      content: '9f9a2b5e-402a-41f3-a554-08dcd4935701.jpg',
      description: 'A great exercise for lower body strength and mass.',
      exerciseType: 1,
    },
    regions: [
      {id: 'a699d914-362c-43e4-550c-08dcd4c2abcb'}, // Quadriceps
      {id: '5f2dd122-b1c3-4195-550b-08dcd4c2abcb'}, // Hamstrings
      {id: '143d505b-6fad-42aa-550d-08dcd4c2abcb'}, // Glutes
    ],
  },
  {
    exercise: {
      id: '3b4c8d22-f55e-49d3-aaa1-9876543210ff',
      name: 'Crunch',
      content: '3b4c8d22-f55e-49d3-aaa1-9876543210ff.jpg',
      description: 'One of the common exercises that develops abdominal muscles.',
      exerciseType: 1,
    },
    regions: [
      {id: 'bc1e8801-f11d-421e-5504-08dcd4c2abcb'}, // Upper Abdominals
      {id: 'cb3c7a70-cf41-485c-5505-08dcd4c2abcb'}, // Lower Abdominals
    ],
  },
  {
    exercise: {
      id: '49d81e22-f73a-4d4a-bb22-111122223333',
      name: 'Pull-Up',
      content: '49d81e22-f73a-4d4a-bb22-111122223333.jpg',
      description: 'Bodyweight exercise that works the back and biceps muscles.',
      exerciseType: 1,
    },
    regions: [
      {id: '8611c489-0e94-4f5e-5509-08dcd4c2abcb'}, // Upper Back & Neck
      {id: '89e28c3a-078a-4c59-5501-08dcd4c2abcb'}, // Biceps
      {id: 'a436ccf0-e8f7-4fe9-5507-08dcd4c2abcb'}, // Forearms
    ],
  },
  {
    exercise: {
      id: '5e6f7a8b-9c4d-3e91-d508-dcd49355fe4d',
      name: 'Deadlift',
      content: '5e6f7a8b-9c4d-3e91-d508-dcd49355fe4d.jpg',
      description: "You lift the weight off the floor with the help of your body's major muscle groups.",
      exerciseType: 1,
    },
    regions: [
      {id: '356fa8d4-3c51-4410-550a-08dcd4c2abcb'}, // Lower Back
      {id: '143d505b-6fad-42aa-550d-08dcd4c2abcb'}, // Glutes
      {id: '5f2dd122-b1c3-4195-550b-08dcd4c2abcb'}, // Hamstrings
      {id: 'a699d914-362c-43e4-550c-08dcd4c2abcb'}, // Quadriceps
    ],
  },
  {
    exercise: {
      id: '7a8b9c4d-3e91-d508-dcd4-9355fe4d5e6f',
      name: 'Push-Up',
      content: '7a8b9c4d-3e91-d508-dcd4-9355fe4d5e6f.jpg',
      description: 'The push-up is a common calisthenics exercise beginning from the prone position.',
      exerciseType: 1,
    },
    regions: [
      {id: '02764bc5-8138-4e3c-5502-08dcd4c2abcb'}, // Chest
      {id: '02c74030-cf5e-40c4-5500-08dcd4c2abcb'}, // Shoulders
      {id: '78821fd2-223e-46ee-5508-08dcd4c2abcb'}, // Triceps
    ],
  },
  {
    exercise: {
      id: '4d3e91d5-08dc-d493-55fe-4d5e6f7a8b9c',
      name: 'Calf Raise',
      content: '4d3e91d5-08dc-d493-55fe-4d5e6f7a8b9c.jpg',
      description: 'Basic exercise to develop calf muscles',
      exerciseType: 1,
    },
    regions: [
      {id: 'f2bc0a83-654f-495f-5503-08dcd4c2abcb'}, // Calves
    ],
  },
  {
    exercise: {
      id: '3e91d508-dcd4-9355-fe4d-5e6f7a8b9c4d',
      name: 'Lat Pulldown',
      content: '3e91d508-dcd4-9355-fe4d-5e6f7a8b9c4d.jpg',
      description: 'Effective exercise for broad back muscles',
      exerciseType: 1,
    },
    regions: [
      {id: '8611c489-0e94-4f5e-5509-08dcd4c2abcb'}, // Upper Back & Neck
      {id: '89e28c3a-078a-4c59-5501-08dcd4c2abcb'}, // Biceps
    ],
  },
  {
    exercise: {
      id: '91d508dc-d493-55fe-4d5e-6f7a8b9c4d3e',
      name: 'Leg Curl',
      content: '91d508dc-d493-55fe-4d5e-6f7a8b9c4d3e.jpg',
      description: 'Movement that works the hamstring muscles in isolation',
      exerciseType: 1,
    },
    regions: [
      {id: '5f2dd122-b1c3-4195-550b-08dcd4c2abcb'}, // Hamstrings
    ],
  },
  {
    exercise: {
      id: 'd508dcd4-9355-fe4d-5e6f-7a8b9c4d3e91',
      name: 'Leg Extension',
      content: 'd508dcd4-9355-fe4d-5e6f-7a8b9c4d3e91.jpg',
      description: 'Movement that works the quadriceps muscles in isolation',
      exerciseType: 1,
    },
    regions: [
      {id: 'a699d914-362c-43e4-550c-08dcd4c2abcb'}, // Quadriceps
    ],
  },
  {
    exercise: {
      id: '9355fe4d-5e6f-7a8b-9c4d-3e91d508dcd4',
      name: 'Bicycle Crunch',
      content: '9355fe4d-5e6f-7a8b-9c4d-3e91d508dcd4.jpg',
      description: 'Effective movement that works all abdominal muscles',
      exerciseType: 2,
    },
    regions: [
      {id: 'bc1e8801-f11d-421e-5504-08dcd4c2abcb'}, // Upper Abdominals
      {id: 'cb3c7a70-cf41-485c-5505-08dcd4c2abcb'}, // Lower Abdominals
      {id: '85758791-3ba1-4e9e-5506-08dcd4c2abcb'}, // Side Abs
    ],
  },
  {
    exercise: {
      id: 'fe4d5e6f-7a8b-9c4d-3e91-d508dcd49355',
      name: 'Triceps Dip',
      content: 'fe4d5e6f-7a8b-9c4d-3e91-d508dcd49355.jpg',
      description: 'Effective movement targeting the triceps muscles',
      exerciseType: 1,
    },
    regions: [
      {id: '78821fd2-223e-46ee-5508-08dcd4c2abcb'}, // Triceps
      {id: '02c74030-cf5e-40c4-5500-08dcd4c2abcb'}, // Shoulders
    ],
  },
];
