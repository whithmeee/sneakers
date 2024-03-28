import { ReactNode } from "react";
import ContentLoader from "react-content-loader";

interface ContentLoader {
    props?: ReactNode;
}
const MyLoader = (props: ContentLoader) => (
    <ContentLoader
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        speed={0.5}
        width={271}
        height={540}
        viewBox="0 0 271 540"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="288" y="367" rx="0" ry="0" width="0" height="1" />
        <rect x="288" y="368" rx="0" ry="0" width="1" height="1" />
        <rect x="239" y="412" rx="0" ry="0" width="26" height="2" />
        <rect x="207" y="396" rx="0" ry="0" width="11" height="10" />
        <rect x="227" y="431" rx="0" ry="0" width="19" height="2" />
        <rect x="105" y="157" rx="0" ry="0" width="0" height="44" />
        <circle cx="133" cy="155" r="122" />
        <rect x="178" y="227" rx="0" ry="0" width="0" height="1" />
        <rect x="11" y="299" rx="5" ry="5" width="263" height="14" />
    </ContentLoader>
);

export default MyLoader;
