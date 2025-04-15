const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-600 text-center py-4 border-t mt-auto">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Your Company. All rights
                reserved.
            </p>
        </footer>
    );
};

export default Footer;
