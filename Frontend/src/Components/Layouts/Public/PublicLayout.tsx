import { AppLayoutProps } from '../AppLayout.d';

function PublicLayout({ children }: Readonly<AppLayoutProps>): JSX.Element {
  return (
    <>
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PublicLayout;
