interface Props {
    steps: string[];
    currentStep: number;
}

export const StepIndicator: React.FC<Props> = ({ steps, currentStep }) => {
    return (
        <div className="flex justify-center space-x-4 mb-6">
            {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold 
                        ${index <= currentStep ? 'bg-[var(--heading-color)] text-white' : 'bg-gray-300 text-gray-600'}`}
                    >
                        {index + 1}
                    </div>
                    <span className="text-sm mt-1">{step}</span>
                </div>
            ))}
        </div>
    );
};
