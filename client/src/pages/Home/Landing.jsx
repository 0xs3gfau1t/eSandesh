const Landing = () => {
	return (
		<div>
			<div className=" w-full sm:w-3/5 px-4">
				<div className="flex">
					<div className="w-full sm:w-2/3">
						<HomeHero />
					</div>
					<div className="w-1/3 sm:block hidden">
						<RecentNews />
					</div>
				</div>
				<h1 className="font-semibold text-2xl">Hottest Topics</h1>
				<SideScrollNewsSection category={"hot"} />
				<RectAds
					type={
						"ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
					}
				/>
				<div className="mb-10 pb-4">
					{/* middle scrolling news under the hero section */}
					<EachCategoryPreview category="health" />
					<RectAds
						type={
							"ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
						}
					/>
				</div>
				<div className="mb-10 pb-4">
					{/* middle scrolling news under the hero section */}
					<EachCategoryPreview category="technology" />
					<RectAds
						type={
							"ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
						}
					/>
				</div>
				{/* other category previews go here */}I think other category
				previews should be placed here ok
				{/* end of categories preview / middle scrolling section ends here */}
			</div>
			{/* end of outlet */}
			<div className="sm:w-1/5 sm:block hidden">
				<SportsHighlights />
			</div>
		</div>
	)
}

export default Landing
