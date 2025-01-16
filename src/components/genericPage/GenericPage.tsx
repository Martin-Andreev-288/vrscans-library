import { Loader } from "..";

type GenericPageProps = {
  SidebarComponent: React.FC;
  title: string;
  emptyPageText?: string;
  navButton?: React.ReactNode;
  isLoading?: boolean;
  children?: React.ReactNode;
};

export default function GenericPage({
  SidebarComponent,
  title,
  emptyPageText,
  navButton,
  isLoading,
  children
}: GenericPageProps) {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="main">
      <aside className="pt-14">
        <SidebarComponent />
      </aside>
      <div className="p-2 pt-0">
        <h1 className="text-xl font-bold mb-6 text-center">{title}</h1>
        {children ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {children}
          </ul>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-6 text-center">{emptyPageText}</h1>
            {navButton && <div className="mt-4 flex justify-center">{navButton}</div>}
          </>
        )}
      </div>
    </div>
  );
}
