// GLOBAL CONFIGURATION

var docpadConfig = {

	templateData : {
		site : {
			title : 'SH MEDIA',
			description: "We provide modern web development services focusing on Javscript front and back-end technologies",
      		keywords: "Web Development, Service",
		},

		getPreparedTitle: function () {
		    if (this.document.title) {
		        return this.document.title + " | " + this.site.title;
		    } else {
		        return this.site.title;
		    }
	    },

	    getPreparedDescription: function () {
      		return this.document.description || this.site.description;
    	},

    	getPreparedKeywords: function () {
      		return this.site.keywords.concat(this.document.keywords || []).join(", ");
    	}
	},

	enabledPlugins: {
		sass : true,
		compass : true
	},



	plugins : {
		sass : {
			requireLibraries : ['compass', 'susy']
		}
	}
}

module.exports = docpadConfig