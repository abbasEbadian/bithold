import { useRouter } from "next/router";


const withAuth = (WrappedComponent, authOnly=true) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
        const Router = useRouter();
        const accessToken = localStorage.getItem('token')

        console.log(accessToken , authOnly )
      // If there is no access token we redirect to "/" page.
      if (!accessToken && authOnly ) {
        location.href = "/login"
        return null;
      }
      if ( accessToken && !authOnly ) {
        location.href = "/dashboard"
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;