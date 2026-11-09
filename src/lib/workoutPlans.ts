export type BodyType = 'heavy' | 'medium' | 'slim';

export type FitnessGoal = 'lose_weight' | 'lose_belly_fat' | 'six_packs' | 'gain_muscle';

export interface ExerciseItem {
  name: string;
  sets: number;
  reps: string;
  restSec: number;
  tip: string;
}

export interface DayRoutine {
  day: number;
  week: number;
  title: string;
  focus: string;
  isRest: boolean;
  durationMin: number;
  estCaloriesBurned: number;
  exercises: ExerciseItem[];
  dailyNutritionTip: string;
}

export interface WorkoutPlan {
  id: string;
  bodyType: BodyType;
  goal: FitnessGoal;
  goalTitle: string;
  bodyTypeTitle: string;
  summary: string;
  recommendedCaloricPace: string;
  weeklySchedule: {
    week: number;
    weekTitle: string;
    description: string;
    days: DayRoutine[];
  }[];
}

export const BODY_TYPES = [
  {
    id: 'heavy' as BodyType,
    label: 'Excess Weight / Big Stomach',
    subtitle: 'Heavier build with midsection fat',
    description: 'Focuses on low-impact high-caloric burn, joint safety, and aggressive metabolic acceleration to melt visceral belly fat.',
    accentColor: '#FF6B00',
  },
  {
    id: 'medium' as BodyType,
    label: 'Medium / Average Build',
    subtitle: 'Proportional frame with moderate body fat',
    description: 'Focuses on body recomposition: burning stubborn fat layers while hardening muscle definition and tightening the core.',
    accentColor: '#CCFF00',
  },
  {
    id: 'slim' as BodyType,
    label: 'Slim / Lean Frame',
    subtitle: 'Fast metabolism with low muscle volume',
    description: 'Focuses on progressive mechanical tension, hypertrophy mass building, and clean caloric surplus without unwanted fat gain.',
    accentColor: '#00F0FF',
  },
];

export const FITNESS_GOALS = [
  {
    id: 'lose_weight' as FitnessGoal,
    title: 'Lose Overall Body Weight',
    tagline: 'Full Body Fat Depletion',
    description: 'Maximize total daily energy expenditure (TDEE) with high-density supersets and metabolic circuits.',
    badge: 'Max Caloric Burn',
  },
  {
    id: 'lose_belly_fat' as FitnessGoal,
    title: 'Lose Stubborn Belly Fat',
    tagline: 'Visceral Midsection Shred',
    description: 'Target insulin resistance, visceral belly fat stores, and waist circumference reduction through HIIT and compound core bracing.',
    badge: 'Waistline Focus',
  },
  {
    id: 'six_packs' as FitnessGoal,
    title: 'Build 6-Pack Abs',
    tagline: 'Deep Core Hypertrophy',
    description: 'Sculpt the upper, lower, and transverse abdominis with weighted resistance, vacuum holds, and sub-12% body fat protocol.',
    badge: 'Chiseled Core',
  },
  {
    id: 'gain_muscle' as FitnessGoal,
    title: 'Gain Muscle & Mass',
    tagline: 'Clean Hypertrophy & Bulk',
    description: 'Drive muscle protein synthesis with mechanical tension, heavy compound lifts, and progressive overload.',
    badge: 'Mass & Strength',
  },
];

export function generate30DayPlan(bodyType: BodyType, goal: FitnessGoal): WorkoutPlan {
  const goalMeta = FITNESS_GOALS.find((g) => g.id === goal)!;
  const bodyMeta = BODY_TYPES.find((b) => b.id === bodyType)!;

  let summary = '';
  let caloricPace = '';

  if (goal === 'lose_weight') {
    summary = `Customized for a ${bodyMeta.label} aiming for whole-body fat reduction. Combines compound resistance to preserve muscle tissue with metabolic intervals to maintain high post-workout oxygen consumption (EPOC).`;
    caloricPace = bodyType === 'heavy' ? '500 - 700 kcal daily deficit' : '400 - 500 kcal daily deficit';
  } else if (goal === 'lose_belly_fat') {
    summary = `Engineered to accelerate visceral fat oxidation around the waist. Emphasizes steady heart-rate spikes, anti-rotational core stabilization, and cortisol-lowering active rest days.`;
    caloricPace = '400 - 600 kcal deficit + zero liquid sugars';
  } else if (goal === 'six_packs') {
    summary = `Focused on direct hypertrophy of the rectus abdominis and obliques combined with caloric precision to strip subcutaneous fat covering the abdominal wall.`;
    caloricPace = '300 - 450 kcal deficit with 2.2g protein per kg bodyweight';
  } else {
    summary = `Designed to maximize muscular hypertrophy, progressive overload, and structural strength without excessive fat accumulation.`;
    caloricPace = bodyType === 'slim' ? '400 - 600 kcal caloric surplus' : '250 - 350 kcal clean surplus';
  }

  const weeks = [
    {
      week: 1,
      weekTitle: 'Week 1: Metabolic Foundation & Activation',
      description: 'Prime your central nervous system, learn proper bracing, and establish cardiovascular endurance.',
    },
    {
      week: 2,
      weekTitle: 'Week 2: Volume & Intensity Surge',
      description: 'Increase working sets, reduce rest periods, and force higher caloric output.',
    },
    {
      week: 3,
      weekTitle: 'Week 3: Peak Metabolic Demand',
      description: 'Maximum compound density. Push through plateaus with drop-sets and core compression circuits.',
    },
    {
      week: 4,
      weekTitle: 'Week 4: Final Sculpt & Transformation',
      description: 'Consolidate fat loss and muscle retention with high-intensity supersets and functional testing.',
    },
  ];

  const getExercisesForDay = (dayIndex: number, currentGoal: FitnessGoal, currentBody: BodyType): ExerciseItem[] => {
    const isRest = dayIndex % 7 === 0 || dayIndex % 7 === 4;
    if (isRest) return [];

    if (currentGoal === 'lose_weight') {
      if (dayIndex % 2 === 1) {
        return [
          { name: currentBody === 'heavy' ? 'Goblet Box Squats' : 'Barbell Back Squats', sets: 4, reps: '12-15 reps', restSec: 60, tip: 'Keep chest upright, drive through heels' },
          { name: 'Dumbbell Push Press', sets: 4, reps: '12 reps', restSec: 45, tip: 'Engage core tight at top lockout' },
          { name: 'Seated Cable Rows', sets: 3, reps: '15 reps', restSec: 45, tip: 'Squeeze shoulder blades 1 second' },
          { name: currentBody === 'heavy' ? 'Incline Treadmill Power Walk' : 'Kettlebell Swings', sets: 4, reps: '40 sec on / 20 sec off', restSec: 45, tip: 'Maintain strong hip hinge' },
          { name: 'Plank Shoulder Taps', sets: 3, reps: '20 total reps', restSec: 30, tip: 'Prevent hips from rotating' },
        ];
      } else {
        return [
          { name: 'Romanian Deadlifts (Dumbbells)', sets: 4, reps: '12 reps', restSec: 60, tip: 'Hinge hips backwards, feel hamstrings' },
          { name: 'Incline Dumbbell Chest Press', sets: 4, reps: '12 reps', restSec: 60, tip: 'Controlled 3-second eccentric lower' },
          { name: 'Lat Pulldowns (Wide Grip)', sets: 3, reps: '12-15 reps', restSec: 45, tip: 'Pull elbows down toward back pockets' },
          { name: currentBody === 'heavy' ? 'Stationary Bike High-Resistance Sprints' : 'Burpees / Step-outs', sets: 4, reps: '10-12 reps', restSec: 45, tip: 'Continuous steady rhythm' },
          { name: 'Deadbugs with Hold', sets: 3, reps: '12 reps per side', restSec: 30, tip: 'Keep lower back glued to floor' },
        ];
      }
    } else if (currentGoal === 'lose_belly_fat') {
      if (dayIndex % 2 === 1) {
        return [
          { name: 'High-Knee March / Incline Interval Sprint', sets: 5, reps: '45 sec high / 30 sec low', restSec: 30, tip: 'Elevate heart rate to trigger fat oxidation' },
          { name: 'Dumbbell Walking Lunges', sets: 3, reps: '12 reps per leg', restSec: 45, tip: 'Torso upright, engage core' },
          { name: 'Hanging Knee Raises (or Captains Chair)', sets: 4, reps: '15 reps', restSec: 45, tip: 'Curl pelvis up at top, do not swing' },
          { name: 'Russian Twists with Weight', sets: 3, reps: '20 total twists', restSec: 30, tip: 'Rotate through upper torso, brace abs' },
          { name: 'Mountain Climbers (Strict Form)', sets: 4, reps: '35 seconds', restSec: 30, tip: 'Knees directly toward elbows' },
        ];
      } else {
        return [
          { name: 'Trap Bar or Dumbbell Deadlift', sets: 4, reps: '10-12 reps', restSec: 60, tip: 'High compound activation burns visceral fat' },
          { name: 'Push-Ups (or Incline Bench Push-ups)', sets: 3, reps: '12-15 reps', restSec: 45, tip: 'Full lockout with packed lats' },
          { name: 'Cable Woodchoppers (High to Low)', sets: 3, reps: '12 reps per side', restSec: 30, tip: 'Power generated from the core' },
          { name: 'Plank with Knee-to-Elbow', sets: 3, reps: '12 reps', restSec: 30, tip: 'Squeeze abs on every contraction' },
          { name: 'Rowing Machine Fast 500m', sets: 3, reps: '500 meters', restSec: 60, tip: 'Push hard with legs first, then pull' },
        ];
      }
    } else if (currentGoal === 'six_packs') {
      if (dayIndex % 2 === 1) {
        return [
          { name: 'Weighted Cable Crunches', sets: 4, reps: '15-20 reps', restSec: 45, tip: 'Curl spine like a shrimp, do not hinge hips' },
          { name: 'Hanging Strict Leg Raises', sets: 4, reps: '12-15 reps', restSec: 45, tip: 'Raise toes to bar level, slow lowering' },
          { name: 'Ab Wheel Rollouts (or Ball Rollouts)', sets: 3, reps: '10-12 reps', restSec: 45, tip: 'Never allow lower back to arch' },
          { name: 'Side Plank Hip Dips', sets: 3, reps: '15 reps per side', restSec: 30, tip: 'Targets internal and external obliques' },
          { name: 'Stomach Vacuum Holds', sets: 4, reps: '20 second holds', restSec: 30, tip: 'Exhale fully, pull belly button to spine' },
        ];
      } else {
        return [
          { name: 'Front Squats (or Goblet Squats)', sets: 4, reps: '10 reps', restSec: 60, tip: 'Demands tremendous anterior core stability' },
          { name: 'Decline Weighted Sit-ups', sets: 3, reps: '15 reps', restSec: 45, tip: 'Plate held against chest' },
          { name: 'Hollow Body Holds', sets: 4, reps: '35 seconds', restSec: 30, tip: 'Keep lower back firmly on floor' },
          { name: 'Bicycle Crunches (Tempo 2-2)', sets: 3, reps: '20 total reps', restSec: 30, tip: 'Pause for 1 second on each twist' },
          { name: 'Dragon Flags (Eccentric only if beginner)', sets: 3, reps: '6-8 reps', restSec: 60, tip: 'Elite core strength move' },
        ];
      }
    } else {
      // Gain Muscle
      if (dayIndex % 2 === 1) {
        return [
          { name: 'Barbell Flat Bench Press', sets: 4, reps: '8-10 reps', restSec: 90, tip: 'Retract scapula, drive feet into ground' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12 reps', restSec: 60, tip: 'Upper pectoral development' },
          { name: 'Overhead Barbell Military Press', sets: 4, reps: '8 reps', restSec: 90, tip: 'Full lockout, head through window' },
          { name: 'Triceps Rope Pushdowns', sets: 3, reps: '12-15 reps', restSec: 45, tip: 'Spread rope at the bottom' },
          { name: 'Dumbbell Lateral Raises', sets: 4, reps: '15 reps', restSec: 45, tip: 'Slight forward lean, raise with elbows' },
        ];
      } else {
        return [
          { name: 'Barbell Back Squats', sets: 4, reps: '8-10 reps', restSec: 90, tip: 'Break at knees and hips together' },
          { name: 'Barbell Bent-Over Rows', sets: 4, reps: '8-10 reps', restSec: 90, tip: 'Pull bar to lower belly button' },
          { name: 'Romanian Deadlifts', sets: 3, reps: '10 reps', restSec: 60, tip: 'Hamstring stretch and glute drive' },
          { name: 'Standing Incline Dumbbell Bicep Curls', sets: 3, reps: '12 reps', restSec: 45, tip: 'Supinate wrists at top' },
          { name: 'Calf Raises on Leg Press', sets: 4, reps: '15-20 reps', restSec: 45, tip: 'Full 2-second stretch at bottom' },
        ];
      }
    }
  };

  const getDayDetails = (dayNum: number, currentGoal: FitnessGoal, currentBody: BodyType): DayRoutine => {
    const isRest = dayNum % 7 === 0 || dayNum % 7 === 4;
    const weekNum = Math.ceil(dayNum / 7);

    if (isRest) {
      return {
        day: dayNum,
        week: weekNum,
        title: `Day ${dayNum}: Active Recovery & Regeneration`,
        focus: 'Active Mobility & Hydration',
        isRest: true,
        durationMin: 20,
        estCaloriesBurned: 120,
        exercises: [],
        dailyNutritionTip: 'Focus on 3-4 liters of water, electrolyte balance, and 8+ hours of deep restorative sleep to rebuild broken muscle fibers.',
      };
    }

    const titles: Record<FitnessGoal, string[]> = {
      lose_weight: [
        'Full Body Metabolic Ignition',
        'Lower Body Caloric Burn',
        'Upper Body Dynamic Strength',
        'Endurance & Core Fusion',
        'Metcon High-Volume Blast',
      ],
      lose_belly_fat: [
        'Visceral Fat Shred & Sprint Intervals',
        'Deep Core Bracing & Compound Power',
        'Metabolic Waistline Sculpting',
        'Anti-Rotational Trunk Conditioning',
        'High-Intensity Caloric Depletion',
      ],
      six_packs: [
        'Upper & Lower Abdominal Hypertrophy',
        'Transverse Abdominis & Vacuum Compression',
        'Rotational Oblique Hardening',
        'Core Bracing & Hanging Progression',
        'Chiseled 6-Pack Density Protocol',
      ],
      gain_muscle: [
        'Chest & Triceps Push Hypertrophy',
        'Back & Biceps Pull Density',
        'Quad & Hamstring Muscle Overload',
        'Shoulder Cannonball & Trap Sculpt',
        'Heavy Compound Progressive Overload',
      ],
    };

    const focusList = titles[currentGoal];
    const titleText = focusList[(dayNum - 1) % focusList.length];

    const exercises = getExercisesForDay(dayNum, currentGoal, currentBody);
    const duration = currentBody === 'heavy' ? 35 : 45;
    const calories = currentGoal === 'lose_weight' ? 420 : currentGoal === 'lose_belly_fat' ? 390 : currentGoal === 'six_packs' ? 340 : 360;

    let tip = '';
    if (currentGoal === 'lose_belly_fat') {
      tip = 'Keep carbohydrates centered within 2 hours around your workout. Minimize stress and late-night snacking to prevent cortisol spikes.';
    } else if (currentGoal === 'six_packs') {
      tip = 'Consume lean protein with every meal (chicken breast, egg whites, whey, white fish). Salt your food moderately to avoid subcutaneous water retention.';
    } else if (currentGoal === 'gain_muscle') {
      tip = 'Target a positive nitrogen balance: consume 1.8g to 2.2g of protein per kg of bodyweight, paired with complex carbs (oats, rice, sweet potatoes).';
    } else {
      tip = 'Maintain a high vegetable fiber intake to stay satiated during your calorie deficit. Drink 500ml water before every meal.';
    }

    return {
      day: dayNum,
      week: weekNum,
      title: `Day ${dayNum}: ${titleText}`,
      focus: currentGoal.replace('_', ' ').toUpperCase(),
      isRest: false,
      durationMin: duration,
      estCaloriesBurned: calories,
      exercises,
      dailyNutritionTip: tip,
    };
  };

  const weeklySchedule = weeks.map((w) => {
    const daysInWeek = Array.from({ length: 7 }, (_, i) => {
      const dayNum = (w.week - 1) * 7 + (i + 1);
      if (dayNum > 30) return null;
      return getDayDetails(dayNum, goal, bodyType);
    }).filter(Boolean) as DayRoutine[];

    // Ensure day 29 and 30 are in Week 4
    if (w.week === 4) {
      if (!daysInWeek.some((d) => d.day === 29)) daysInWeek.push(getDayDetails(29, goal, bodyType));
      if (!daysInWeek.some((d) => d.day === 30)) daysInWeek.push(getDayDetails(30, goal, bodyType));
    }

    return {
      ...w,
      days: daysInWeek,
    };
  });

  return {
    id: `plan_${bodyType}_${goal}`,
    bodyType,
    goal,
    goalTitle: goalMeta.title,
    bodyTypeTitle: bodyMeta.label,
    summary,
    recommendedCaloricPace: caloricPace,
    weeklySchedule,
  };
}
