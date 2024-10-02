import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../components/header';
import Login from '../../components/login';

function Authorization() {
    
    const { t } = useTranslate();

    return (
        <PageLayout>
            <Header/>
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <Login/>
        </PageLayout>
    );
}

export default memo(Authorization);
