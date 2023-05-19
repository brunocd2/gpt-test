import { PageWrapper } from "./styles";

export default function PageContainer({ customWrapper, title, children }) {
  return (
    <PageWrapper>
      
      <header>
        
        <h1>{title}</h1>
      </header>
      {customWrapper 
        ? children
        : <main>{children}</main>
      }
    </PageWrapper>
  )
}