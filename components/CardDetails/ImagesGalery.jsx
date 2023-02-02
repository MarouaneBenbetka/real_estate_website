import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ImagesGalery({ images }) {
	return (
		<div className="border-2 border-purple w-fit rounded-[6px] mt-2 mx-auto md:mx-0">
			<Carousel
				sx={{ maxWidth: 650 }}
				mx="auto"
				withIndicators
				className="carousel"
				styles={{
					indicator: {
						width: 12,
						height: 8,
						transition: "width 250ms ease",
						"&[data-active]": {
							width: 32,
						},
					},
					control: {
						"&[data-inactive]": {
							opacity: 0,
							cursor: "default",
						},
					},
				}}
				nextControlIcon={
					<MdOutlineNavigateNext
						size={28}
						className="bg-white2 rounded-full"
						color="#7065F0"
					/>
				}
				previousControlIcon={
					<MdOutlineNavigateBefore
						size={28}
						className="bg-white2 rounded-full"
						color="#7065F0"
					/>
				}
			>
				{images.map((img) => (
					<Carousel.Slide key={img}>
						<TransformWrapper>
							<TransformComponent>
								<div className="w-[86vw] md:w-[50vw] h-[380px] ">
									<Image
										src={img}
										alt="img"
										fill
										className="object-cover object-center rounded-[4px]"
									/>
								</div>
							</TransformComponent>
						</TransformWrapper>
					</Carousel.Slide>
				))}
			</Carousel>
		</div>
	);
}
