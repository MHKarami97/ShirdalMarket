module Jekyll
  class CategoryPage < Jekyll::PageWithoutAFile
    def initialize(site, base, slug, category_name)
      @site = site
      @base = base
      @dir  = File.join("categories", slug)
      @name = "index.html"

      self.process(@name)

      self.data = {}
      self.data["layout"] = "category"
      self.data["title"] = category_name
      self.data["category_name"] = category_name
      self.data["permalink"] = "/categories/#{slug}/"

      self.content = ""
    end
  end

  class CategoryPagesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      categories = site.data["categories"]

      if categories.nil? || categories.empty?
        Jekyll.logger.warn "CategoryPagesGenerator:", "site.data['categories'] is empty or nil. Check _data/categories.yml exists and is valid YAML."
        return
      end

      seen_slugs = []

      categories.each_with_index do |cat, index|
        if cat["slug"].nil? || cat["name"].nil?
          Jekyll.logger.warn "CategoryPagesGenerator:", "Skipping category at index #{index} — missing 'slug' or 'name'. Raw data: #{cat.inspect}"
          next
        end

        if seen_slugs.include?(cat["slug"])
          raise "Duplicate category slug detected: #{cat['slug']}"
        end
        seen_slugs << cat["slug"]

        Jekyll.logger.info "CategoryPagesGenerator:", "Generating /categories/#{cat['slug']}/"
        site.pages << CategoryPage.new(site, site.source, cat["slug"], cat["name"])
      end
    end
  end
end