// src/pages/MaintenancePage.tsx

const MaintenancePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
                Site en maintenance
            </h1>
            <p className="text-gray-600 text-lg">
                Nous faisons actuellement une mise à jour. Merci de revenir plus
                tard.
            </p>
        </div>
    );
};

export default MaintenancePage;
