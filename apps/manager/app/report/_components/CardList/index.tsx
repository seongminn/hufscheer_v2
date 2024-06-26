import { HoldIcon, RestoreIcon, UnholdIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { useMemo } from 'react';

import Card from '@/components/Card';
import useCreateReportBlockMutation from '@/hooks/mutations/useCreateReportBlockMutation';
import useCreateReportUnPendingMutation from '@/hooks/mutations/useCreateReportUnPendingMutation';
import useUpdateCheerTalkUnblockMutation from '@/hooks/mutations/useUpdateCheerTalkUnblockMutation';
import useReportsQuery from '@/hooks/queries/useReportsQuery';

import * as styles from './CardList.css';
import MenuModal from '../MenuModal';

type CardListProps = {
  type: 'pending' | 'isBlocked';
  caption?: string;
};

export default function CardList({ type, caption }: CardListProps) {
  const { data: reports, refetch } = useReportsQuery();
  const { mutate: createReportBlockMutation } = useCreateReportBlockMutation();
  const { mutate: createReportUnPendingMutation } =
    useCreateReportUnPendingMutation();
  const { mutate: updateCheerTalkUnblockMutation } =
    useUpdateCheerTalkUnblockMutation();

  const reportList = useMemo(
    () => (type === 'pending' ? reports?.pending : reports?.isBlocked),
    [type, reports],
  );

  const handleBlock = async (reportId: number) => {
    createReportBlockMutation({ reportId }, { onSuccess: () => refetch() });
  };

  const handleRestore = async (id: number) => {
    if (type === 'pending') {
      createReportUnPendingMutation(
        { reportId: id },
        { onSuccess: () => refetch() },
      );
    } else {
      updateCheerTalkUnblockMutation(
        { cheerTalkId: id },
        { onSuccess: () => refetch() },
      );
    }
  };

  return (
    <section>
      <p className={styles.title}>
        {type === 'pending' ? '보류 중' : '차단됨'}
      </p>
      {reportList && reportList.length > 0 ? (
        reportList.map(({ reportInfo, gameInfo }) => {
          const { cheerTalkId, reportId, content } = reportInfo;

          return (
            <div key={cheerTalkId} className={styles.wrapper}>
              <Card.Root paddingVertical="sm">
                <div className={styles.card.container}>
                  <Card.Content>
                    <div className={styles.card.content}>
                      <Card.Title text="semibold">{content}</Card.Title>
                      <Card.SubContent>
                        {`${gameInfo.leagueName} > ${gameInfo.gameName}`}
                      </Card.SubContent>
                    </div>
                  </Card.Content>
                  <div className={styles.card.menu}>
                    <MenuModal
                      type="restore"
                      content={content}
                      onPositiveClick={() =>
                        handleRestore(
                          type === 'pending' ? reportId : cheerTalkId,
                        )
                      }
                    >
                      <Icon
                        source={type === 'pending' ? UnholdIcon : RestoreIcon}
                        color={type === 'pending' ? 'primary' : 'gray'}
                        size="xs"
                      />
                    </MenuModal>
                    {type === 'pending' && (
                      <MenuModal
                        type="block"
                        content={content}
                        onPositiveClick={() => handleBlock(reportId)}
                      >
                        <Icon source={HoldIcon} size="xs" color="error" />
                      </MenuModal>
                    )}
                  </div>
                </div>
              </Card.Root>
            </div>
          );
        })
      ) : (
        <p className={styles.noData}>해당하는 응원톡이 없습니다.</p>
      )}
      {caption && <p className={styles.caption}>{caption}</p>}
    </section>
  );
}
