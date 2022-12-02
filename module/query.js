// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
export default `
query ($search: String $page: Int, $perPage: Int, $id: Int) { # Define which variables will be used in the query (id)
	Page (page: $page, perPage: $perPage) {
		pageInfo {
		  total
		  currentPage
		  lastPage
		  hasNextPage
		  perPage
		}
		
		media (id: $id, search: $search, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
			id
			title {
			  romaji
			  english
			  native
			}
			type 
			description
			startDate {
				year
				month
				day
			}
			duration
			episodes
			chapters
			status
			bannerImage
			genres
			synonyms
			averageScore
			bannerImage
			coverImage {
				extraLarge
				large
				medium
				color
			}
			tags {
				name
				description
				category
				rank
			}
			studios {
				nodes {
					name
					siteUrl
				}
			}
			externalLinks {
				url
				site
			}
			format
			source
		}
	}
}
`;
