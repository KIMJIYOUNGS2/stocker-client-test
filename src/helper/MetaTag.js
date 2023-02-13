import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = () => {
  return (
    <Helmet>
      <title>스토커J에 대하여</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
        rel="stylesheet"
      />
      <meta property="og:url" content="https://project-worldcup.netlify.app/" />
      <meta property="og:title" content="스토커J에 대하여" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://github.com/MiniMini-On/stocker-client/blob/master/src/static/images/man.jpga074.png"
      />
      <meta property="og:description" content="개발자 성향 테스트" />
    </Helmet>
  );
};

export default MetaTag;
