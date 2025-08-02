import { useState } from 'react';
import Button from '../components/ui/Button';
import { StepIndicator } from '../components/annonce/steps/StepIndicator';
import { ReviewStep } from '../components/annonce/steps/ReviewStep';
import { ImageUploadStep } from '../components/annonce/steps/ImageUploadStep';
import { AnnouncementDetailsStep } from '../components/annonce/steps/AnnouncementDetailsStep';

const steps = ['Details', 'Images', 'Review'];

export interface AnnouncementDetails {
    title: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    subCategory?: string;
    storeId: string;
}

const CreateAnnouncementPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [announcement, setAnnouncement] = useState<AnnouncementDetails>({
        title: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        storeId: '',
    });
    const [images, setImages] = useState<File[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const next = () =>
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
    const handleSubmit = () => setIsSubmitted(true);

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <AnnouncementDetailsStep
                        details={announcement}
                        onChange={setAnnouncement}
                    />
                );
            case 1:
                return <ImageUploadStep images={images} onChange={setImages} />;
            case 2:
                return (
                    <ReviewStep
                        details={announcement}
                        images={images}
                        onSubmit={handleSubmit}
                    />
                );
        }
    };

    return (
        <div className="space-y-4">
            <h1 className="product-detail-header-text text-center">
                Créer une announce
            </h1>

            <StepIndicator currentStep={currentStep} steps={steps} />

            <div className="p-6 transition-all duration-500">
                {renderStep()}
            </div>

            {!isSubmitted && (
                <div className="px-6 flex justify-between mt-6">
                    <Button
                        className="px-8"
                        disabled={currentStep === 0}
                        onClick={prev}
                    >
                        Back
                    </Button>
                    {currentStep < steps.length - 1 && (
                        <Button className="px-8" onClick={next}>
                            Next
                        </Button>
                    )}
                </div>
            )}

            {isSubmitted && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center shadow-md">
                    ✅ Your announcement has been submitted successfully!
                </div>
            )}
        </div>
    );
};

export default CreateAnnouncementPage;
