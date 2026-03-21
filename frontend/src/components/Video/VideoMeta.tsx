import { Button } from '../common/Button';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function VideoMeta({
    video,
    isCompleted,
    onComplete,
    subjectId
}: {
    video: any;
    isCompleted: boolean;
    onComplete: () => void;
    subjectId: string;
}) {
    const router = useRouter();

    return (
        <div className="mt-8 mb-16 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                        {video.title}
                    </h1>
                    <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                        <span className="font-medium">{video.subject_title}</span>
                        <span>•</span>
                        <span>{video.section_title}</span>
                    </p>
                    <div className="prose prose-sm text-gray-700 max-w-none">
                        {video.description}
                    </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    {!isCompleted ? (
                        <Button onClick={onComplete} variant="outline" className="gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Mark Completed
                        </Button>
                    ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md">
                            <CheckCircle2 className="w-4 h-4" />
                            Completed
                        </div>
                    )}
                </div>
            </div>

            <hr className="my-8 border-gray-200" />

            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    disabled={!video.previous_video_id}
                    onClick={() => router.push(`/subjects/${subjectId}/video/${video.previous_video_id}`)}
                    className="gap-2 text-gray-600"
                >
                    <ArrowLeft className="w-4 h-4" /> Previous Lesson
                </Button>

                <Button
                    variant="default"
                    disabled={!video.next_video_id}
                    onClick={() => router.push(`/subjects/${subjectId}/video/${video.next_video_id}`)}
                    className="gap-2"
                >
                    Next Lesson <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
