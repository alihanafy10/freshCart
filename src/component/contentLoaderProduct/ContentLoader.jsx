
import ContentLoader from 'react-content-loader'
export  const MyLoader = () => (
  <ContentLoader viewBox="0 0 166 412">
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="143" height="182"  />
    <rect x="0" y="190" rx="4" ry="4" width="75" height="30" />
    <rect x="0" y="230" rx="4" ry="4" width="75" height="40" />
    <rect x="0" y="290" rx="4" ry="4" width="70" height="30" />
    <rect x="90" y="290" rx="4" ry="4" width="50" height="30" />

    {/* <rect x="160" y="35" rx="3" ry="3" width="80" height="10" /> */}
  </ContentLoader>
);
export  const MySecondLoader = () => (
  <ContentLoader viewBox="0 0 166 200">
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="120" height="120" style={{maxWidth:"120"}} />
    <rect x="0" y="130" rx="4" ry="4" width="75" height="30" style={{maxWidth:"75"}}/>

    {/* <rect x="160" y="35" rx="3" ry="3" width="80" height="10" /> */}
  </ContentLoader>
);