# # -*- coding: utf-8 -*-
# import scrapy
# from scrapy.http import Request



# class SubjectsSpider(scrapy.Spider):
#     name = 'subjects'
#     allowed_domains = ['class-central.com']
#     start_urls = ['http://class-central.com/subjects']

#     def __init__(self, subject=None):
#         self.subject = subject

#     def parse(self, response):
#         if self.subject:
#            subject_url = response.xpath('//*[contains(@title,"' + self.subject+ '")]/@href').extract_first()
#            yield Request(response.urljoin(subject_url), callback=self.parse_subject)
#         else :
#             #print (False)
#             self.logger.info('Scraping all subjects.')
#             # subjects = response.xpath('//*[@class="show-all-subjects view-all-courses"]/@href').extract()
#             subjects = response.xpath('//*[@class="text--blue"]/@href').extract()
#             for subject in subjects:
#                 yield Request(response.urljoin(subject), callback=self.parse_subject)

#     # def parse_subject(self, response):
#     #     pass

#     def parse_subject(self, response):
#         subject_name = response.xpath('//title/text()').extract_first()
#         subject_name = subject_name.split(' | ')
#         subject_name = subject_name[0]

#         courses = response.xpath('//*[@class="text--charcoal text-2 medium-up-text-1 block course-name"]')
#         # via = response.xpath('//*[@class="initiativelinks text--charcoal text--italic hover-text--underline tippy-active"]')
#         durations = response.xpath('//*[@class="hidden medium-up-block large-up-inline-block icon--left text-4 small-up-text-3  large-up-margin-left-xxsmall  icon-clock-charcoal"]')
#         pace = response.xpath('//*[@class="start-date text-right text-2 text--charcoal xsmall-only-hidden small-only-hidden medium-only-hidden large-up-width-3-16"]')
#         rateing_stars = response.xpath('//*[@class="course-rating-column text-center medium-up-text-right width-2-16 medium-up-width-4-16 large-up-width-3-16"]')
#         number_of_reviews = response.xpath('//*[@class="xsmall-only-hidden small-only-hidden block margin-top-xxsmall text-4 text--gray"]')


#         for course in courses:
#             course_name = course.xpath('.//@title').extract_first()
#             course_url = course.xpath('.//@href').extract_first()
#             absolute_course_url = response.urljoin(course_url)
#             rateing_star_data = None

#             yield {
#                 'subject_name': subject_name,
#                 'course_name': course_name,
#                 'absolute_course_url': absolute_course_url
#                 # 'rateing_star_data' :rateing_star_data
#             }
#         # for sponsor in via:
#         #     sponsor_data =  sponsor.xpath('.//@data-overlay-trigger').extract_first() 
            
#         #     yield{
#         #         'sponsor_data' : sponsor_data
#         #     }
#         for rateing_star in rateing_stars:
#             rateing_star_data = rateing_star.xpath('.//@data-timestamp').extract_first()

#             yield{
#                 'rateing_star': rateing_star_data
#             }

#         next_page = response.xpath('//*[@rel="next"]/@href').extract_first()
#         absolute_next_page = response.urljoin(next_page)
#         yield Request(absolute_next_page, callback=self.parse_subject)





# -*- coding: utf-8 -*-
import scrapy
from scrapy.http import Request



class SubjectsSpider(scrapy.Spider):
    name = 'subjects'
    allowed_domains = ['class-central.com']
    start_urls = ['http://class-central.com/subjects']

    def __init__(self, subject=None):
        self.subject = subject

    def parse(self, response):
        if self.subject:
           subject_url = response.xpath('//*[contains(@title,"' + self.subject+ '")]/@href').extract_first()
           yield Request(response.urljoin(subject_url), callback=self.parse_subject)
        else :
            self.logger.info('Scraping all subjects.')
            subjects = response.xpath('//*[@class="text--blue"]/@href').extract()
            for subject in subjects:
                yield Request(response.urljoin(subject), callback=self.parse_subject)


    def parse_subject(self, response):
        subject_name = response.xpath('//title/text()').extract_first()
        subject_name = subject_name.split(' | ')
        subject_name = subject_name[0]

        courses = response.xpath('//*[@itemtype="http://schema.org/Event"]')
       
        for course in courses:
            course_name = course.xpath('.//@title').extract_first()
            course_url = course.xpath('.//@href').extract_first()
            absolute_course_url = response.urljoin(course_url)

            yield {
                'subject_name': subject_name,
                'course_name': course_name,
                'absolute_course_url': absolute_course_url
            }
       
        
        next_page = response.xpath('//*[@rel="next"]/@href').extract_first()
        absolute_next_page = response.urljoin(next_page)
        yield Request(absolute_next_page, callback=self.parse_subject)