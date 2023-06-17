<template>
	<h1>Screenplay Details</h1>
</template>

<script>
export default {
	data() {
		return {
			screenplay: {},
			reviewed: false,
			value: 5,
			article_url: "ur/l",
			is_submitted: false,
			is_10_and_article_blank: false,
			need_www: false,
			invalid_url: false,
			loading: false,
		};
	},

	methods: {
		submitReview: async function () {
			const formData = new FormData();
			formData.append("screenplay", JSON.stringify(this.screenplay));
			formData.append("rating", this.value);
			formData.append("article_url", this.article_url);
			try {
				this.loading = true;
				const result = await axios.put("/review/submit", formData);
				this.loading = false;
				this.is_submitted = result.data.is_submitted;
				this.is_10_and_article_blank =
					result.data.is_10_and_article_blank;
				this.need_www = result.data.need_www;
				this.invalid_url = result.data.invalid_url;
			} catch (err) {
				this.loading = false;
				console.error(err.toString());
			}
		},
	},
};
</script>
