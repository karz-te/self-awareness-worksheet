export type FormData = {
    step1Scene: string;
    step1Body: string;
    step1Feelings: string;
    step1Intensity: number | null;

    step2External: string;
    step2Internal: string;
    step2Physical: string;
    step2Social: string;
    step2Fatigue: number | null;

    step3Reliefs: string;
    step3Awareness: string;
    step3ReliefScore: number | null;

    step4Name: string;
    step4Guide: string;
    step4Confidence: number | null;
};