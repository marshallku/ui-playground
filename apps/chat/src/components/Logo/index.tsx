export interface LogoProps {
    className?: string;
}

function Logo({ className }: LogoProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className={className}>
            <path
                d="M504 663.2l112.2-68.3c2-1.2 3-.7 3 1.7V732c0 2.8 1.3 4.6 3.5 6.4l114.7 88.1c1.7 1.2 3.2 1.2 4.9 0L873.6 734c1.9-1.3 2.8-2.8 2.7-5.2-.2-4.4 0-448.6 0-448.6 0-2.4-1-3.2-2.5-4.6l-116.9-100c-4.2-3.7-5-3.8-9.7-.9L504 332.3c-4 2.6-4 2.6-7.9 0L252.9 174.7c-4.7-2.9-5.5-2.8-9.7.9l-116.9 100c-1.6 1.4-2.5 2.2-2.5 4.6 0 0 .2 444.2 0 448.6-.1 2.4.8 3.9 2.7 5.2l131.3 92.5c1.6 1.2 3.1 1.2 4.9 0l114.7-88.1c2.2-1.8 3.5-3.6 3.5-6.4V596.6c0-2.4 1-2.9 3-1.7L496 663.2c4 2.4 4 2.4 8 0zm0-153.2l326-213.4c1.6-1 3.1-.2 3.1 1.7l3.8 422.4c0 1.8-.6 3.1-2.1 4.1l-81.7 57.5c-1.4 1-1.4 1-1.4-.7l1.1-303.5c0-6.2-3.6-8.4-8.1-5.6L504 620c-4 2.5-4 2.5-7.9 0L255.4 472.5c-4.5-2.8-8.1-.6-8.1 5.6l1.1 303.5c0 1.7-.6 1.7-2 .7l-81.1-57.5c-1.5-1-2.1-2.3-2.1-4.1l3.8-422.4c0-1.9 1.5-2.7 3.1-1.7L496 510c4 2.5 4 2.5 8 0z"
                fill="#f0718c"
            />
        </svg>
    );
}

export default Logo;
