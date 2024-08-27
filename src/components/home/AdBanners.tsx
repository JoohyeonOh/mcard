import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "@/styles/colorPalette";
import { useQuery } from "react-query";
import { getAdBanners } from "@/remote/adBanner";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import { Link } from "react-router-dom";
import { AdBanner } from "@/models/card";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function AdBanners() {
  const { data, isLoading } = useQuery("adBanners", () => getAdBanners());

  if (!data || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold>&nbsp;</Text>
          <Text typography="t7">&nbsp;</Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to={banner.link}>
              <Flex direction="column" css={bannerContainerStyles}>
                <Text bold>{banner.title}</Text>
                <Text typography="t7">{banner.description}</Text>
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
`;

const bannerContainerStyles = css`
  background-color: ${colors.gray};
  padding: 16px;
  border-radius: 4px;
`;
