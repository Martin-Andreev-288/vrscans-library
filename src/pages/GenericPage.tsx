type GenericPageProps<T extends object> = {
  SidebarComponent: React.FC;
  title: string;
  items: T[];
  ComponentCard: React.FC<T>;
  emptyPageText: string;
  navButton?: React.ReactNode;
};

export default function GenericPage<T extends object>({
  SidebarComponent,
  title,
  items,
  ComponentCard,
  emptyPageText,
  navButton
}: GenericPageProps<T>) {
  return (
    <div className="main">
      <aside>
        <SidebarComponent />
      </aside>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
        {items.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {items.map((item, index) => (
              <ComponentCard key={index} {...item} />
            ))}
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
