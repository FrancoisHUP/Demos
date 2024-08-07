import scrapy
from bs4 import BeautifulSoup

class WebCrawlerSpider(scrapy.Spider):
    name = "web_crawler"
    start_urls = ["https://freedium.cfd/https://bhavikjikadara.medium.com/graphrag-advanced-data-retrieval-for-enhanced-insights-bcef777404d2"]

    def parse(self, response):
        # Use BeautifulSoup to parse the HTML content
        soup = BeautifulSoup(response.body, 'lxml')

        # Extract text content from the parsed HTML
        page_text = soup.get_text(separator=' ', strip=True)

        # Store the extracted text
        yield {
            'url': response.url,
            'text': page_text,
        }

        # Follow links to other pages and repeat the process
        for link in response.css('a::attr(href)').getall():
            if link.startswith('/'):
                link = response.urljoin(link)
            yield scrapy.Request(link, callback=self.parse)

        # Handle pagination
        next_page = response.css('a.next::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)
