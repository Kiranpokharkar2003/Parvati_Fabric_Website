import { useEffect } from "react";

const InfiniteLoader = ({ loadMore }) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 400
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return null;
};

export default InfiniteLoader;


// const LoaderWrap = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 2rem 0;
// `;

// const Loader = styled.div`
//   border: 4px solid #f3f3f3;
//   border-top: 4px solid #3498db;

//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   animation: spin 2s linear infinite;

//   @keyframes spin {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;


