import { Code, Book, Zap, Copy, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { useLanguage } from './LanguageContext';
import type { ServiceEndpoint } from '../types/api';

interface APIDocumentationProps {
  endpoints: ServiceEndpoint[];
}

export function APIDocumentation({ endpoints }: APIDocumentationProps) {
  const { language, t } = useLanguage();
  const fontClass = language === 'km' ? 'font-kh' : 'font-en';
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      geocoding: 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-900/50',
      routing: 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-900/50',
      places: 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border border-purple-300 dark:border-purple-900/50',
      maps: 'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-900/50',
      elevation: 'bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-400 border border-pink-300 dark:border-pink-900/50'
    };
    return colors[category] || 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700/50';
  };

  const categories = [...new Set(endpoints.map(e => e.category))];

  return (
    <div className="space-y-6 mx-[0px] my-[0px] m-[0px]">
      <div>
        <h2 className={`text-zinc-900 dark:text-zinc-100 mb-1 ${fontClass}`}>{t.docs.title}</h2>
        <p className={`text-sm text-zinc-600 dark:text-zinc-400 ${fontClass}`}>{t.docs.subtitle}</p>
      </div>

      <Card className="bg-white dark:bg-card border-zinc-200 dark:border-zinc-800 mt-[0px] mr-[0px] mb-[30px] ml-[0px] p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-blue-500" />
          <h3 className={`text-zinc-900 dark:text-zinc-100 ${fontClass}`}>{t.docs.quickStart}</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className={`text-sm text-zinc-700 dark:text-zinc-300 mb-2 ${fontClass}`}>{t.docs.quickStartStep1}</p>
            <CodeBlock code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\\\
  https://api.roktenh.io/v1/geocode?address=New+York`} />
          </div>
          <div>
            <p className={`text-sm text-zinc-700 dark:text-zinc-300 mb-2 ${fontClass}`}>{t.docs.quickStartStep2}</p>
            <CodeBlock code={`https://api.roktenh.io/v1/geocode?address=New+York&key=YOUR_API_KEY`} />
          </div>
        </div>
      </Card>

      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className={`capitalize ${fontClass}`}>
              {t.docs[category as keyof typeof t.docs] || category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-4 mt-6">
            {endpoints
              .filter(e => e.category === category)
              .map((endpoint, index) => (
                <Card key={index} className="sm:p-6 bg-white dark:bg-card border-zinc-200 dark:border-zinc-800 mt-[0px] mr-[0px] mb-[10px] ml-[0px] py-[20px] px-[24px]">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-en text-zinc-900 dark:text-zinc-100">{endpoint.name}</h3>
                          <Badge className={`${getCategoryColor(endpoint.category)} ${fontClass}`}>
                            {t.docs[endpoint.category as keyof typeof t.docs] || endpoint.category}
                          </Badge>
                        </div>
                        <p className="font-en text-sm text-zinc-600 dark:text-zinc-400">{endpoint.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-300 dark:border-green-900/50 font-en">
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded text-zinc-900 dark:text-zinc-100 break-all font-en">
                        {endpoint.path}
                      </code>
                      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-900/50 sm:ml-auto font-en">
                        ${endpoint.pricePerRequest.toFixed(3)}{t.docs.perRequest}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className={`text-sm text-zinc-700 dark:text-zinc-300 ${fontClass}`}>{t.docs.exampleRequest}</p>
                      <CodeBlock code={`curl -X ${endpoint.method} \\\\
  -H "Authorization: Bearer YOUR_API_KEY" \\\\
  https://api.roktenh.io${endpoint.path}`} />
                    </div>

                    <div className="space-y-2">
                      <p className={`text-sm text-zinc-700 dark:text-zinc-300 ${fontClass}`}>{t.docs.exampleResponse}</p>
                      <CodeBlock code={`{
  "status": "success",
  "data": {
    // Response data here
  }
}`} />
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>

      <Card className="p-4 sm:p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
        <div className="flex items-start gap-3">
          <Book className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className={`text-sm text-blue-800 dark:text-blue-300 mb-1 ${fontClass}`}>{t.docs.needHelp}</h3>
            <p className={`text-sm text-blue-700 dark:text-blue-200 ${fontClass}`}>
              {t.docs.needHelpDesc}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}