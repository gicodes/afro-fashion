export const subPages = [
  { name: 'Getting Started', path: '/help/#getting-started' }, 
  { name: 'Chat with Support', path: 'https://wa.me/2347066207973' }, 
  { name: 'Subscriptions', path: '/subscriptions' },
  { name: 'Refund Policy', path: '/refund-policy' },
  { name: 'Support Center', path: '/help/#contact-us' },
  { name: 'Terms of Service', path: '/terms-of-service' }, 
] 

export const HelpPagePopUp = () => {
  return (
    <div className={`card mx-2 container bg-ws -lg`}>
      <div className='card-body sub-pages'>
        { subPages.map((page, i) => (
          <p key={i}>
            <a href={page.path}>{page.name}</a>
          </p>
        ))}
      </div>        
    </div>
  )
}
