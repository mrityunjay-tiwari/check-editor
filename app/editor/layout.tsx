export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="bg-gray-50">
            <main className="max-w-5xl mt-28 mx-auto border bg-white min-h-screen">{children}</main>
        </div>
    )
}