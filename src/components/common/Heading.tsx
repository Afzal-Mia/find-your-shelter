//@src/components/common/Heading.tsx

interface HeadingProps {
    children: React.ReactNode;
}

export default function Heading({ children }: HeadingProps) {
    return (
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {children}
        </h1>
    );
}