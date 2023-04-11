export const renderMoodColor = (mood) => {
    switch (mood) {
		case "Sarcastic":
			return "bg-sarcastic-gray";
		case "Mind-blowing":
			return "bg-mindBlowing-gold";
		case "Inspirational":
			return "bg-inspirational-pink";
		case "Informative":
			return "bg-informative-teal";
		case "Humorous":
			return "bg-humorous-pink";
		case "Analytical":
			return "bg-analytical-green";
		case "Creative":
			return "bg-creative-orange";
		case "Provocative":
			return "bg-provocative-red";
		case "Introspective":
			return "bg-introspective-purple text-white";
		case "Nostalgic":
			return "bg-nostalgic-beige";
		case "Satire":
			return "bg-satire-blue";
		default:
			return "bg-gray-500";
	}
}